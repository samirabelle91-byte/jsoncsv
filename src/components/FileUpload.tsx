import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { CloudUpload, FileJson2, FileUp, FileTerminal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatFileSize } from '@/types/formatters';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes: string[];
  maxSize: number;
  isUploading: boolean;
  uploadProgress: number;
}

export function FileUpload({ onFileUpload, acceptedTypes, maxSize, isUploading, uploadProgress }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !acceptedTypes.includes(`.${extension}`)) {
      setError(`Invalid file format. Accepted formats: ${acceptedTypes.join(', ')}`);
      return false;
    }
    if (file.size > maxSize) {
      setError(`File too large. Maximum size: ${formatFileSize(maxSize)}`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <Card
        className={`relative overflow-hidden transition-all duration-300 ${
          isDragging ? 'border-primary-cyan bg-primary-cyan/5 scale-[1.02]' : 'border-dashed'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className={`p-6 rounded-full transition-colors ${
              isDragging ? 'bg-primary-cyan/20' : 'bg-neutral-gray-100'
            }`}>
              <CloudUpload className="w-12 h-12 text-primary-cyan" />
            </div>
          </div>
          
          <h3 className="heading-md mb-2">Upload File</h3>
          <p className="body-md text-muted-foreground mb-6">
            Drag and drop your file here
          </p>
          
          <Button 
            onClick={handleClick}
            disabled={isUploading}
            className="bg-primary-cyan hover:bg-primary-cyan/90"
          >
            or click to browse
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          
          <div className="mt-6 flex justify-center gap-4 text-muted-foreground body-sm">
            <div className="flex items-center gap-2">
              <FileTerminal className="w-4 h-4" />
              <span>CSV</span>
            </div>
            <div className="flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              <span>Excel</span>
            </div>
            <div className="flex items-center gap-2">
              <FileJson2 className="w-4 h-4" />
              <span>JSON</span>
            </div>
          </div>
          
          <p className="caption text-muted-foreground mt-4">
            Maximum file size: {formatFileSize(maxSize)}
          </p>
        </div>
        
        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
            <div className="flex items-center gap-3">
              <Progress value={uploadProgress} className="flex-1" />
              <span className="body-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
          </div>
        )}
      </Card>
      
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}