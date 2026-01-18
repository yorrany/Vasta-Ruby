-- Add cover_image_credit column to profiles table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'cover_image_credit') THEN
        ALTER TABLE public.profiles ADD COLUMN cover_image_credit text;
    END IF;
END $$;
