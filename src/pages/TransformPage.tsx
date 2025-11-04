import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DataPreview } from '@/components/DataPreview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Copy, Download, FileJson2, Database, FileTerminal } from 'lucide-react';
import { mockTableData } from '@/data/transformerMockData';
import { OutputFormat } from '@/types/enums';
import { useClipboard } from '@/hooks/useClipboard';
import { useToast } from '@/hooks/use-toast';

export function TransformPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState(mockTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(OutputFormat.JSON);
  const [transformedData, setTransformedData] = useState('');
  
  const { copy, copied } = useClipboard();
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Simulate data loading
          setPreviewData(mockTableData);
          generateTransformedData(OutputFormat.JSON);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateTransformedData = (format: OutputFormat) => {
    let output = '';
    
    switch (format) {
      case OutputFormat.JSON:
        output = JSON.stringify(previewData, null, 2);
        break;
      case OutputFormat.SQL_INSERT:
        output = previewData.map(row => 
          `INSERT INTO customers (id, name, email, age, joinDate, active) VALUES (${row.id}, '${row.name}', '${row.email}', ${row.age}, '${row.joinDate}', ${row.active});`
        ).join('\n');
        break;
      case OutputFormat.SQL_CREATE_TABLE:
        output = `CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  age INT,
  joinDate DATE,
  active BOOLEAN
);`;
        break;
      case OutputFormat.CSV:
        const headers = Object.keys(previewData[0]).join(',');
        const rows = previewData.map(row => Object.values(row).join(',')).join('\n');
        output = `${headers}\n${rows}`;
        break;
      default:
        output = JSON.stringify(previewData, null, 2);
    }
    
    setTransformedData(output);
  };

  const handleFormatChange = (value: string) => {
    const format = value as OutputFormat;
    setOutputFormat(format);
    generateTransformedData(format);
  };

  const handleCopy = async () => {
    const success = await copy(transformedData);
    if (success) {
      toast({
        title: 'Copied!',
        description: 'Transformed data copied to clipboard',
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([transformedData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transformed_data.${outputFormat}`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'File downloaded successfully',
    });
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">Transform Your Data</h1>
          <p className="body-md text-muted-foreground">
            Upload your file and transform it to any format you need
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload and Preview */}
          <div className="space-y-6">
            <FileUpload
              onFileUpload={handleFileUpload}
              acceptedTypes={['.csv', '.xlsx', '.xls', '.json']}
              maxSize={10485760} // 10MB
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />

            {uploadedFile && (
              <DataPreview
                data={previewData}
                totalRows={previewData.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="heading-sm mb-4">Output Format</h3>
              
              <ToggleGroup 
                type="single" 
                value={outputFormat}
                onValueChange={handleFormatChange}
                className="justify-start flex-wrap"
              >
                <ToggleGroupItem value={OutputFormat.JSON} className="gap-2">
                  <FileJson2 className="w-4 h-4" />
                  JSON
                </ToggleGroupItem>
                <ToggleGroupItem value={OutputFormat.SQL_INSERT} className="gap-2">
                  <Database className="w-4 h-4" />
                  SQL INSERT
                </ToggleGroupItem>
                <ToggleGroupItem value={OutputFormat.SQL_CREATE_TABLE} className="gap-2">
                  <Database className="w-4 h-4" />
                  SQL CREATE
                </ToggleGroupItem>
                <ToggleGroupItem value={OutputFormat.CSV} className="gap-2">
                  <FileTerminal className="w-4 h-4" />
                  CSV
                </ToggleGroupItem>
              </ToggleGroup>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="body-sm font-medium">Transformed Data</label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopy}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleDownload}
                      className="gap-2 bg-primary-cyan hover:bg-primary-cyan/90"
                      disabled={!transformedData}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={transformedData}
                  readOnly
                  className="font-mono text-sm min-h-[400px]"
                  placeholder="Transformed data will appear here..."
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}