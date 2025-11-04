import { 
  FileType, 
  DataType, 
  OutputFormat, 
  UserPlan,
  TransformationStatus,
  ViewMode,
  TextTransform,
  NullHandling
} from '../types/enums';

// Mock data for file upload
export const mockUploadedFile = {
  name: 'customer_data.csv',
  size: 245760,
  type: FileType.CSV,
  uploadedAt: new Date('2025-01-15T10:30:00'),
  rowCount: 150
};

// Mock data for table preview
export const mockTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, joinDate: '2024-01-15', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 34, joinDate: '2024-02-20', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, joinDate: '2024-03-10', active: false },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', age: 29, joinDate: '2024-04-05', active: true },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', age: 52, joinDate: '2024-05-12', active: true },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', age: 31, joinDate: '2024-06-18', active: false },
  { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', age: 38, joinDate: '2024-07-22', active: true },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', age: 26, joinDate: '2024-08-30', active: true },
  { id: 9, name: 'George Miller', email: 'george@example.com', age: 41, joinDate: '2024-09-14', active: false },
  { id: 10, name: 'Hannah Lee', email: 'hannah@example.com', age: 33, joinDate: '2024-10-25', active: true }
];

// Mock data for column mapping

export const mockColumnMappings = [
  { sourceColumn: 'id', targetColumn: 'customer_id', dataType: DataType.NUMBER },
  { sourceColumn: 'name', targetColumn: 'full_name', dataType: DataType.STRING },
  { sourceColumn: 'email', targetColumn: 'email_address', dataType: DataType.EMAIL },
  { sourceColumn: 'age', targetColumn: 'age', dataType: DataType.NUMBER },
  { sourceColumn: 'joinDate', targetColumn: 'registration_date', dataType: DataType.DATE },
  { sourceColumn: 'active', targetColumn: 'is_active', dataType: DataType.BOOLEAN }
];

export const mockTransformationSettings = {
  trimWhitespace: true,
  removeDuplicates: false,
  nullHandling: NullHandling.REPLACE_EMPTY,
  textTransform: TextTransform.TITLE_CASE,
  dateFormat: 'YYYY-MM-DD',
  decimalPlaces: 2,
  thousandSeparator: true,
  currencySymbol: '$'
};

export const mockOutputSettings = {
  format: OutputFormat.JSON,
  jsonStructure: 'array',
  sqlTableName: 'customers',
  includeHeaders: true
};

export const mockUser = {
  id: 'user_123',
  email: 'user@example.com',
  name: 'John Doe',
  plan: UserPlan.FREE as UserPlan,
  storageUsed: 52428800,
  storageLimit: 104857600,
  transformationsThisMonth: 45,
  transformationLimit: 100,
  createdAt: new Date('2024-06-15T08:00:00')
};


// Mock data for transformation history

export const mockTransformationHistory = [
  {
    id: 'trans_1',
    fileName: 'customer_data.csv',
    inputFormat: FileType.CSV,
    outputFormat: OutputFormat.JSON,
    rowCount: 150,
    timestamp: new Date('2025-01-15T10:30:00'),
    status: TransformationStatus.COMPLETE
  },
  {
    id: 'trans_2',
    fileName: 'sales_report.xlsx',
    inputFormat: FileType.EXCEL_XLSX,
    outputFormat: OutputFormat.SQL_INSERT,
    rowCount: 320,
    timestamp: new Date('2025-01-14T14:20:00'),
    status: TransformationStatus.COMPLETE
  },
  {
    id: 'trans_3',
    fileName: 'inventory.csv',
    inputFormat: FileType.CSV,
    outputFormat: OutputFormat.JSON,
    rowCount: 89,
    timestamp: new Date('2025-01-13T09:15:00'),
    status: TransformationStatus.COMPLETE
  }
];

export const mockSavedTemplates = [
  {
    id: 'template_1',
    name: 'Customer Data Standard',
    description: 'Standard transformation for customer CSV files',
    columnMappings: mockColumnMappings,
    transformationSettings: mockTransformationSettings,
    outputFormat: OutputFormat.JSON,
    createdAt: new Date('2024-12-01T10:00:00'),
    isFavorite: true
  },
  {
    id: 'template_2',
    name: 'Sales Report SQL',
    description: 'Convert sales data to SQL INSERT statements',
    columnMappings: [],
    transformationSettings: mockTransformationSettings,
    outputFormat: OutputFormat.SQL_INSERT,
    createdAt: new Date('2024-11-15T15:30:00'),
    isFavorite: false
  }
];

export const mockPricingPlans = [
  {
    plan: UserPlan.FREE,
    price: 0,
    features: [
      'Up to 100 transformations/month',
      'Max file size: 10MB',
      'Basic transformations',
      'Community support'
    ],
    fileSizeLimit: 10485760,
    transformationLimit: 100,
    batchOperations: false,
    apiAccess: false
  },
  {
    plan: UserPlan.PREMIUM,
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      'Unlimited transformations',
      'Max file size: 100MB',
      'Advanced transformations',
      'Batch operations',
      'API access',
      'Priority support'
    ],
    fileSizeLimit: 104857600,
    transformationLimit: -1,
    batchOperations: true,
    apiAccess: true
  }
];

export const mockCurrentTransformation = {
  status: TransformationStatus.IDLE,
  progress: 0,
  currentStep: 'upload',
  uploadedFile: null,
  previewData: [],
  columnMappings: [],
  transformationSettings: mockTransformationSettings,
  outputSettings: mockOutputSettings,
  transformedData: null,
  viewMode: ViewMode.ORIGINAL
};