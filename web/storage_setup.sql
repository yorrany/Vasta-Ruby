-- Create 'avatars' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true) 
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access to all files in 'avatars'
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'avatars' );

-- Policy: Allow authenticated users to upload files to 'avatars'
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'avatars' );

-- Policy: Allow users to update/delete their own files (Optional but good)
-- For now, simplistic approach: Authenticated users can do anything on their own objects if we added owner tracking, 
-- but simpler for MVP: just allow upload.
-- Usually we enforce auth.uid() = owner, but storage.objects 'owner' column is sometimes tricky depending on setup.
-- Let's stick to simple insert policy for now to fix the blockage.
