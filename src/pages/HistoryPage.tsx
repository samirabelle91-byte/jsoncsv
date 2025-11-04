import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileJson2, Database, FileTerminal, MoreVertical, Star, Loader2 } from 'lucide-react';
import { mockSavedTemplates } from '@/data/transformerMockData';
import { formatDate } from '@/types/formatters';
import { OutputFormat, FileType } from '@/types/enums';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTransformationHistory, deleteTransformation, type Transformation } from '@/services/transformationService';

export function HistoryPage() {
  const [history, setHistory] = useState<Transformation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const data = await getTransformationHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransformation(id);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete transformation:', error);
    }
  };

  const getFormatIcon = (format: OutputFormat | FileType) => {
    switch (format) {
      case OutputFormat.JSON:
      case FileType.JSON:
        return <FileJson2 className="w-4 h-4" />;
      case OutputFormat.SQL_INSERT:
      case OutputFormat.SQL_CREATE_TABLE:
        return <Database className="w-4 h-4" />;
      default:
        return <FileTerminal className="w-4 h-4" />;
    }
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">History & Templates</h1>
          <p className="body-md text-muted-foreground">
            View your past transformations and saved templates
          </p>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="history">Transformation History</TabsTrigger>
            <TabsTrigger value="templates">Saved Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : history.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No transformations yet. Upload a file to get started!</p>
                  </Card>
                ) : (
                  history.map((item) => (
                    <Card key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-primary-cyan/10">
                            {getFormatIcon(item.input_format as FileType)}
                          </div>
                          <div className="flex-1">
                            <h3 className="heading-sm mb-1">{item.file_name}</h3>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="secondary">
                                {item.input_format.toUpperCase()}
                              </Badge>
                              <span className="text-muted-foreground">→</span>
                              <Badge variant="secondary">
                                {item.output_format.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 body-sm text-muted-foreground">
                              <span>{item.row_count} rows</span>
                              <span>{formatDate(new Date(item.created_at))}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={item.status === 'complete' ? 'default' : 'secondary'}
                            className="bg-success-green"
                          >
                            {item.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {mockSavedTemplates.map((template) => (
                  <Card key={template.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-accent-amber/10">
                          <Database className="w-5 h-5 text-accent-amber" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="heading-sm">{template.name}</h3>
                            {template.isFavorite && (
                              <Star className="w-4 h-4 fill-accent-amber text-accent-amber" />
                            )}
                          </div>
                          <p className="body-sm text-muted-foreground mb-2">
                            {template.description}
                          </p>
                          <div className="flex flex-wrap gap-4 body-sm text-muted-foreground">
                            <span>Output: {template.outputFormat.toUpperCase()}</span>
                            <span>{formatDate(template.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Apply Template
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}