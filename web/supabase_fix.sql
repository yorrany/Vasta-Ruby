-- 1. Ensure public.profiles has an email column (required by frontend)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'email') THEN
        ALTER TABLE public.profiles ADD COLUMN email text;
    END IF;
END $$;

-- 2. Create Trigger Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_tenant_id bigint;
BEGIN
  -- A. Create a default Tenant for the user
  -- Note: We generate a random slug to ensure uniqueness.
  INSERT INTO public.tenants (name, slug, status, created_at, updated_at)
  VALUES (
    COALESCE(new.raw_user_meta_data->>'full_name', 'Minha Organização'),
    lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9]', '', 'g')) || '-' || floor(random() * 10000)::text,
    'active',
    now(),
    now()
  )
  RETURNING id INTO new_tenant_id;

  -- B. Create the Profile linked to the Tenant
  -- Note: user_id is left NULL if it expects a BigInt but we have a UUID.
  -- The integration relies on 'email' for the lookup.
  INSERT INTO public.profiles (
    tenant_id, 
    email, 
    slug, 
    display_name, 
    status, 
    created_at, 
    updated_at
  )
  VALUES (
    new_tenant_id,
    new.email,
    lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9]', '', 'g')) || '-' || floor(random() * 10000)::text,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'active',
    now(),
    now()
  );

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach the Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
