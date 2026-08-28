-- SQL Migration Script to fix Supabase schema mismatch
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/jvyudlqbzknossfcfrqd/sql/new

-- 1. Add missing columns for the Bento Counseling Form
ALTER TABLE public.counseling_responses 
ADD COLUMN IF NOT EXISTS device_id TEXT,
ADD COLUMN IF NOT EXISTS counseling_type TEXT,
ADD COLUMN IF NOT EXISTS college_authority_name TEXT,
ADD COLUMN IF NOT EXISTS feedback_text TEXT;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.counseling_responses ENABLE ROW LEVEL SECURITY;

-- 3. Create or update policy to allow anonymous form inserts
DROP POLICY IF EXISTS "Enable anonymous inserts" ON public.counseling_responses;
CREATE POLICY "Enable anonymous inserts" 
ON public.counseling_responses 
FOR INSERT 
WITH CHECK (true);

-- 4. Disable public read/delete access for security
DROP POLICY IF EXISTS "Disable public read/write" ON public.counseling_responses;
CREATE POLICY "Disable public read/write" 
ON public.counseling_responses 
FOR ALL 
TO public 
USING (false);
