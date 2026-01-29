-- Migration to add 'archived' status to form_submissions

ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS archived_at timestamptz;

-- Update RLS policies if necessary (usually SELECT policies allow if not explicitly filtering columns, but good to check)
-- The existing specific policies (select, update, delete) should cover these new columns automatically if they select * or allow row access.
