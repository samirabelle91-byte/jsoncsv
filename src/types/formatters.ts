import { 
  FileType, 
  DataType, 
  OutputFormat, 
  TextTransform, 
  UserPlan,
  BillingCycle,
  TransformationStatus 
} from './enums';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const formatFileType = (type: FileType): string => {
  const typeMap = {
    [FileType.CSV]: 'CSV',
    [FileType.EXCEL_XLSX]: 'Excel (.xlsx)',
    [FileType.EXCEL_XLS]: 'Excel (.xls)',
    [FileType.JSON]: 'JSON'
  };
  return typeMap[type];
};

export const formatDataType = (type: DataType): string => {
  const typeMap = {
    [DataType.STRING]: 'String',
    [DataType.NUMBER]: 'Number',
    [DataType.DATE]: 'Date',
    [DataType.BOOLEAN]: 'Boolean',
    [DataType.EMAIL]: 'Email'
  };
  return typeMap[type];
};

export const formatOutputFormat = (format: OutputFormat): string => {
  const formatMap = {
    [OutputFormat.JSON]: 'JSON',
    [OutputFormat.SQL_INSERT]: 'SQL INSERT',
    [OutputFormat.SQL_CREATE_TABLE]: 'SQL CREATE TABLE',
    [OutputFormat.CSV]: 'CSV',
    [OutputFormat.EXCEL]: 'Excel'
  };
  return formatMap[format];
};

export const formatTextTransform = (transform: TextTransform): string => {
  const transformMap = {
    [TextTransform.UPPERCASE]: 'UPPERCASE',
    [TextTransform.LOWERCASE]: 'lowercase',
    [TextTransform.TITLE_CASE]: 'Title Case',
    [TextTransform.REVERSE]: 'Reverse'
  };
  return transformMap[transform];
};

export const formatUserPlan = (plan: UserPlan): string => {
  return plan === UserPlan.FREE ? 'Free Plan' : 'Premium Plan';
};

export const formatBillingCycle = (cycle: BillingCycle): string => {
  return cycle === BillingCycle.MONTHLY ? 'Monthly' : 'Yearly';
};

export const formatTransformationStatus = (status: TransformationStatus): string => {
  const statusMap = {
    [TransformationStatus.IDLE]: 'Ready',
    [TransformationStatus.UPLOADING]: 'Uploading...',
    [TransformationStatus.PROCESSING]: 'Processing...',
    [TransformationStatus.COMPLETE]: 'Complete',
    [TransformationStatus.ERROR]: 'Error'
  };
  return statusMap[status];
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};