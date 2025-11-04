// Enums for the CSV/Excel to JSON/SQL Transformer Studio

export const FileType = {
  CSV: 'csv',
  EXCEL_XLSX: 'xlsx',
  EXCEL_XLS: 'xls',
  JSON: 'json'
} as const;

export type FileType = typeof FileType[keyof typeof FileType];

export const DataType = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
  EMAIL: 'email'
} as const;

export type DataType = typeof DataType[keyof typeof DataType];

export const OutputFormat = {
  JSON: 'json',
  SQL_INSERT: 'sql_insert',
  SQL_CREATE_TABLE: 'sql_create_table',
  CSV: 'csv',
  EXCEL: 'excel'
} as const;

export type OutputFormat = typeof OutputFormat[keyof typeof OutputFormat];

export const TextTransform = {
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
  TITLE_CASE: 'title_case',
  REVERSE: 'reverse'
} as const;

export type TextTransform = typeof TextTransform[keyof typeof TextTransform];

export const NullHandling = {
  KEEP: 'keep',
  REMOVE: 'remove',
  REPLACE_EMPTY: 'replace_empty',
  REPLACE_DEFAULT: 'replace_default'
} as const;

export type NullHandling = typeof NullHandling[keyof typeof NullHandling];

export const UserPlan = {
  FREE: 'free',
  PREMIUM: 'premium'
} as const;

export type UserPlan = typeof UserPlan[keyof typeof UserPlan];

export const BillingCycle = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
} as const;

export type BillingCycle = typeof BillingCycle[keyof typeof BillingCycle];

export const TransformationStatus = {
  IDLE: 'idle',
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  COMPLETE: 'complete',
  ERROR: 'error'
} as const;

export type TransformationStatus = typeof TransformationStatus[keyof typeof TransformationStatus];

export const ViewMode = {
  ORIGINAL: 'original',
  TRANSFORMED: 'transformed',
  COMPARISON: 'comparison'
} as const;

export type ViewMode = typeof ViewMode[keyof typeof ViewMode];