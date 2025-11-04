import { FileType } from '@/types/enums';

export interface ParsedData {
  headers: string[];
  rows: Record<string, any>[];
}

export async function parseFile(file: File): Promise<ParsedData> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'csv':
      return parseCSV(file);
    case 'json':
      return parseJSON(file);
    case 'xlsx':
    case 'xls':
      return parseExcel(file);
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

async function parseCSV(file: File): Promise<ParsedData> {
  const text = await file.text();
  const lines = text.trim().split('\n');

  if (lines.length === 0) {
    throw new Error('CSV file is empty');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const rows: Record<string, any>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: Record<string, any> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    rows.push(row);
  }

  return { headers, rows };
}

async function parseJSON(file: File): Promise<ParsedData> {
  const text = await file.text();
  const data = JSON.parse(text);

  if (!Array.isArray(data)) {
    throw new Error('JSON file must contain an array of objects');
  }

  if (data.length === 0) {
    throw new Error('JSON array is empty');
  }

  const headers = Object.keys(data[0]);

  return { headers, rows: data };
}

async function parseExcel(file: File): Promise<ParsedData> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const XLSX = await import('xlsx');
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as Record<string, any>[];

    if (rows.length === 0) {
      throw new Error('Excel sheet is empty');
    }

    const headers = Object.keys(rows[0] as Record<string, any>);

    return { headers, rows };
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getFileType(filename: string): FileType {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'csv':
      return FileType.CSV;
    case 'xlsx':
      return FileType.EXCEL_XLSX;
    case 'xls':
      return FileType.EXCEL_XLS;
    case 'json':
      return FileType.JSON;
    default:
      return FileType.CSV;
  }
}
