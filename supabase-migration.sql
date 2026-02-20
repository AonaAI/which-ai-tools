-- Add extended fields to ai_tools table (safe to run multiple times with IF NOT EXISTS)
-- Run this in Supabase SQL Editor if these columns don't exist yet

ALTER TABLE ai_tools ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE ai_tools ADD COLUMN IF NOT EXISTS pricing TEXT;
ALTER TABLE ai_tools ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE ai_tools ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE ai_tools ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE ai_tools ADD COLUMN IF NOT EXISTS last_updated TEXT;
