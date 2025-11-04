/*
  # Create Transformations and Files Tables

  1. New Tables
    - `transformations` - Store transformation history
      - `id` (uuid, primary key)
      - `file_name` (text)
      - `input_format` (text - csv, xlsx, json)
      - `output_format` (text - json, sql_insert, csv)
      - `input_data` (jsonb - original file data)
      - `output_data` (text - transformed data)
      - `row_count` (integer)
      - `status` (text - idle, processing, complete, error)
      - `error_message` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `transformations` table
    - Add policies for public access (no auth required for demo)

  3. Notes
    - Data is stored in JSONB for flexibility
    - Transformations are public for demo purposes
*/

CREATE TABLE IF NOT EXISTS transformations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  input_format text NOT NULL,
  output_format text NOT NULL,
  input_data jsonb NOT NULL,
  output_data text NOT NULL,
  row_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'complete',
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to transformations"
  ON transformations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to transformations"
  ON transformations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update to transformations"
  ON transformations
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS transformations_created_at_idx 
  ON transformations(created_at DESC);

CREATE INDEX IF NOT EXISTS transformations_file_name_idx 
  ON transformations(file_name);
