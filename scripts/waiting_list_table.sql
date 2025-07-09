-- Waiting List Table
-- Create this table in your Supabase database

CREATE TABLE IF NOT EXISTS waiting_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  interest VARCHAR(100),
  location VARCHAR(255),
  newsletter BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waiting_list_email ON waiting_list(email);
CREATE INDEX IF NOT EXISTS idx_waiting_list_created_at ON waiting_list(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts (allow anyone to insert)
CREATE POLICY "Allow anonymous inserts" ON waiting_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated reads (optional - for admin access)
CREATE POLICY "Allow authenticated reads" ON waiting_list
  FOR SELECT
  TO authenticated
  USING (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waiting_list_updated_at
  BEFORE UPDATE ON waiting_list
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();