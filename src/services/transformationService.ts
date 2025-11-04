import { supabase } from '@/lib/supabase';
import { FileType, OutputFormat } from '@/types/enums';

export interface Transformation {
  id: string;
  file_name: string;
  input_format: FileType;
  output_format: OutputFormat;
  input_data: Record<string, any>[];
  output_data: string;
  row_count: number;
  status: string;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export async function saveTransformation(
  fileName: string,
  inputFormat: FileType,
  outputFormat: OutputFormat,
  inputData: Record<string, any>[],
  outputData: string
): Promise<Transformation> {
  const { data, error } = await supabase
    .from('transformations')
    .insert({
      file_name: fileName,
      input_format: inputFormat,
      output_format: outputFormat,
      input_data: inputData,
      output_data: outputData,
      row_count: inputData.length,
      status: 'complete'
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save transformation: ${error.message}`);
  }

  return data;
}

export async function getTransformationHistory(limit: number = 50): Promise<Transformation[]> {
  const { data, error } = await supabase
    .from('transformations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch transformation history: ${error.message}`);
  }

  return data || [];
}

export async function deleteTransformation(id: string): Promise<void> {
  const { error } = await supabase
    .from('transformations')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete transformation: ${error.message}`);
  }
}
