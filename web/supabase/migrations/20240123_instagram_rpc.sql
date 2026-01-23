-- Create a secure function to fetch Instagram credentials for a public profile
-- This function runs with SECURITY DEFINER privileges (admin) but is scoped to specific usage.

CREATE OR REPLACE FUNCTION get_instagram_connection_secure(target_user_id uuid)
RETURNS TABLE (
  access_token text,
  instagram_user_id text
) 
LANGUAGE plpgsql
SECURITY DEFINER -- Runs as database owner (bypasses RLS)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ic.access_token,
    ic.instagram_user_id
  FROM instagram_connections ic
  WHERE ic.user_id = target_user_id;
END;
$$;

-- Grant execute permission to anon and authenticated roles so `getPublicInstagramFeed` can call it
GRANT EXECUTE ON FUNCTION get_instagram_connection_secure TO anon, authenticated, service_role;
