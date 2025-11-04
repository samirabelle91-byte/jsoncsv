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
import { parseFile, getFileType } from '@/lib/fileParser';
import { transformData } from '@/lib/dataTransformer';
import { saveTransformation } from '@/services/transformationService';

export function TransformPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState<Record<string, any>[]>(mockTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(OutputFormat.JSON);
  const [transformedData, setTransformedData] = useState('');
  
  const { copy, copied } = useClipboard();
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 200);

      // Parse the file
      const { rows } = await parseFile(file);
      setUploadProgress(95);

      // Set preview data
      setPreviewData(rows);
      setCurrentPage(1);

      // Generate transformed data
      const outputData = transformData(rows, { format: OutputFormat.JSON });
      generateTransformedData(OutputFormat.JSON, rows);

      // Save transformation to database
      const fileType = getFileType(file.name);
      await saveTransformation(
        file.name,
        fileType,
        OutputFormat.JSON,
        rows,
        outputData
      );

      clearInterval(progressInterval);
      setUploadProgress(100);
      setIsUploading(false);

      toast({
        title: 'Success!',
        description: `File uploaded and parsed successfully. ${rows.length} rows found.`,
      });
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload file',
      });
    }
  };

  const generateTransformedData = (format: OutputFormat, data: Record<string, any>[] = previewData) => {
    if (data.length === 0) {
      setTransformedData('');
      return;
    }

    try {
      const output = transformData(data, { format });
      setTransformedData(output);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to transform data',
      });
    }
  };

  const handleFormatChange = (value: string) => {
    const format = value as OutputFormat;
    setOutputFormat(format);
    generateTransformedData(format, previewData);
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