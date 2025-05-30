-- First, drop the existing check constraint
ALTER TABLE media DROP CONSTRAINT IF EXISTS media_type_check;

-- Add the new check constraint with 'other' instead of 'pictures'
ALTER TABLE media ADD CONSTRAINT media_type_check 
    CHECK (type IN ('reading', 'music', 'tv', 'other')); 

-- Add private_notes column
ALTER TABLE media ADD COLUMN IF NOT EXISTS private_notes BOOLEAN DEFAULT false;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own media entries" ON media;
DROP POLICY IF EXISTS "Public can view non-private media entries" ON media;

-- Add new policies for read access
CREATE POLICY "Users can read their own media entries"
ON media FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Public can view non-private media entries"
ON media FOR SELECT
TO public
USING (private_notes IS FALSE OR private_notes IS NULL); 