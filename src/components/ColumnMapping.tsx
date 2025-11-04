import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GripVertical, X, Plus } from 'lucide-react';
import { DataType } from '@/types/enums';
import { formatDataType } from '@/types/formatters';

interface ColumnMapping {
  sourceColumn: string;
  targetColumn: string;
  dataType: DataType;
}

interface ColumnMappingProps {
  sourceColumns: string[];
  mappings: ColumnMapping[];
  onMappingChange: (mappings: ColumnMapping[]) => void;
}

export function ColumnMapping({ sourceColumns, mappings, onMappingChange }: ColumnMappingProps) {
  const [localMappings, setLocalMappings] = useState<ColumnMapping[]>(mappings);

  const handleAddMapping = () => {
    const newMapping: ColumnMapping = {
      sourceColumn: sourceColumns[0] || '',
      targetColumn: '',
      dataType: DataType.STRING
    };
    const updated = [...localMappings, newMapping];
    setLocalMappings(updated);
    onMappingChange(updated);
  };

  const handleRemoveMapping = (index: number) => {
    const updated = localMappings.filter((_, i) => i !== index);
    setLocalMappings(updated);
    onMappingChange(updated);
  };

  const handleMappingUpdate = (index: number, field: keyof ColumnMapping, value: string) => {
    const updated = localMappings.map((mapping, i) => 
      i === index ? { ...mapping, [field]: value } : mapping
    );
    setLocalMappings(updated);
    onMappingChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading-sm">Column Mapping</h3>
        <Button onClick={handleAddMapping} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Mapping
        </Button>
      </div>

      <div className="space-y-3">
        {localMappings.map((mapping, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="body-sm text-muted-foreground mb-1 block">Source</label>
                <Select
                  value={mapping.sourceColumn}
                  onValueChange={(value) => handleMappingUpdate(index, 'sourceColumn', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceColumns.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="body-sm text-muted-foreground mb-1 block">Target</label>
                <input
                  type="text"
                  value={mapping.targetColumn}
                  onChange={(e) => handleMappingUpdate(index, 'targetColumn', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Target column name"
                />
              </div>

              <div>
                <label className="body-sm text-muted-foreground mb-1 block">Data Type</label>
                <Select
                  value={mapping.dataType}
                  onValueChange={(value) => handleMappingUpdate(index, 'dataType', value as DataType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(DataType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {formatDataType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveMapping(index)}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {localMappings.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="body-sm">No column mappings yet. Click "Add Mapping" to get started.</p>
          </div>
        )}
      </div>
    </Card>
  );
}