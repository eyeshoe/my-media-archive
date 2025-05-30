-- First, drop the existing check constraint
ALTER TABLE media DROP CONSTRAINT IF EXISTS media_type_check;

-- Add the new check constraint with 'other' instead of 'pictures'
ALTER TABLE media ADD CONSTRAINT media_type_check 
    CHECK (type IN ('reading', 'music', 'tv', 'other')); 