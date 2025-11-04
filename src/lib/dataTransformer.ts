import { OutputFormat } from '@/types/enums';

export interface TransformOptions {
  format: OutputFormat;
  tableName?: string;
}

export function transformData(
  data: Record<string, any>[],
  options: TransformOptions
): string {
  switch (options.format) {
    case OutputFormat.JSON:
      return JSON.stringify(data, null, 2);

    case OutputFormat.CSV:
      return transformToCSV(data);

    case OutputFormat.SQL_INSERT:
      return transformToSQLInsert(data, options.tableName || 'data');

    case OutputFormat.SQL_CREATE_TABLE:
      return transformToSQLCreateTable(data, options.tableName || 'data');

    default:
      return JSON.stringify(data, null, 2);
  }
}

function transformToCSV(data: Record<string, any>[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const headerRow = headers.map(h => escapeCsvField(h)).join(',');

  const rows = data.map(row =>
    headers.map(header => escapeCsvField(String(row[header] ?? ''))).join(',')
  );

  return [headerRow, ...rows].join('\n');
}

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function transformToSQLInsert(data: Record<string, any>[], tableName: string): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const statements: string[] = [];

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];

      if (value === null || value === undefined || value === '') {
        return 'NULL';
      }

      if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      }

      if (typeof value === 'boolean') {
        return value ? 'TRUE' : 'FALSE';
      }

      return String(value);
    });

    const columnList = headers.map(h => `\`${h}\``).join(', ');
    const valueList = values.join(', ');

    statements.push(`INSERT INTO \`${tableName}\` (${columnList}) VALUES (${valueList});`);
  });

  return statements.join('\n');
}

function transformToSQLCreateTable(data: Record<string, any>[], tableName: string): string {
  if (data.length === 0) return `CREATE TABLE \`${tableName}\` ();`;

  const headers = Object.keys(data[0]);
  const columnDefs = headers.map(header => {
    const sampleValue = data[0][header];
    const columnType = inferSQLType(sampleValue);
    return `  \`${header}\` ${columnType}`;
  });

  return `CREATE TABLE \`${tableName}\` (\n${columnDefs.join(',\n')}\n);`;
}

function inferSQLType(value: any): string {
  if (value === null || value === undefined || value === '') {
    return 'VARCHAR(255)';
  }

  if (typeof value === 'boolean') {
    return 'BOOLEAN';
  }

  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'INT' : 'DECIMAL(10, 2)';
  }

  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return 'DATE';
    }

    if (value.includes('@')) {
      return 'VARCHAR(255)';
    }

    return value.length > 100 ? 'TEXT' : 'VARCHAR(255)';
  }

  return 'VARCHAR(255)';
}
