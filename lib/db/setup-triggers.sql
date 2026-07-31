-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to User table
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to Post table
DROP TRIGGER IF EXISTS update_post_updated_at ON "Post";
CREATE TRIGGER update_post_updated_at
BEFORE UPDATE ON "Post"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to ContentBlock table
DROP TRIGGER IF EXISTS update_contentblock_updated_at ON "ContentBlock";
CREATE TRIGGER update_contentblock_updated_at
BEFORE UPDATE ON "ContentBlock"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to Media table
DROP TRIGGER IF EXISTS update_media_updated_at ON "Media";
CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON "Media"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
