import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { TextTransform, NullHandling } from '@/types/enums';
import { formatTextTransform } from '@/types/formatters';

interface TransformationSettings {
  trimWhitespace: boolean;
  removeDuplicates: boolean;
  nullHandling: NullHandling;
  textTransform: TextTransform;
  dateFormat: string;
  decimalPlaces: number;
  thousandSeparator: boolean;
  currencySymbol: string;
}

interface TransformationControlsProps {
  settings: TransformationSettings;
  onSettingsChange: (settings: TransformationSettings) => void;
}

export function TransformationControls({ settings, onSettingsChange }: TransformationControlsProps) {
  const updateSetting = <K extends keyof TransformationSettings>(
    key: K,
    value: TransformationSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="heading-sm mb-4">Transformation Options</h3>

      <Tabs defaultValue="cleaning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
          <TabsTrigger value="formatting">Formatting</TabsTrigger>
          <TabsTrigger value="numbers">Numbers</TabsTrigger>
        </TabsList>

        <TabsContent value="cleaning" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="trim-whitespace">Trim Whitespace</Label>
            <Switch
              id="trim-whitespace"
              checked={settings.trimWhitespace}
              onCheckedChange={(checked) => updateSetting('trimWhitespace', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="remove-duplicates">Remove Duplicates</Label>
            <Switch
              id="remove-duplicates"
              checked={settings.removeDuplicates}
              onCheckedChange={(checked) => updateSetting('removeDuplicates', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="null-handling">Null Value Handling</Label>
            <Select
              value={settings.nullHandling}
              onValueChange={(value) => updateSetting('nullHandling', value as NullHandling)}
            >
              <SelectTrigger id="null-handling">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NullHandling.KEEP}>Keep as null</SelectItem>
                <SelectItem value={NullHandling.REMOVE}>Remove rows</SelectItem>
                <SelectItem value={NullHandling.REPLACE_EMPTY}>Replace with empty string</SelectItem>
                <SelectItem value={NullHandling.REPLACE_DEFAULT}>Replace with default</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="formatting" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="text-transform">Text Transform</Label>
            <Select
              value={settings.textTransform}
              onValueChange={(value) => updateSetting('textTransform', value as TextTransform)}
            >
              <SelectTrigger id="text-transform">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TextTransform).map((transform) => (
                  <SelectItem key={transform} value={transform}>
                    {formatTextTransform(transform)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Input
              id="date-format"
              value={settings.dateFormat}
              onChange={(e) => updateSetting('dateFormat', e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <p className="body-sm text-muted-foreground">
              Use YYYY for year, MM for month, DD for day
            </p>
          </div>
        </TabsContent>

        <TabsContent value="numbers" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="decimal-places">Decimal Places: {settings.decimalPlaces}</Label>
            <Slider
              id="decimal-places"
              min={0}
              max={10}
              step={1}
              value={[settings.decimalPlaces]}
              onValueChange={([value]) => updateSetting('decimalPlaces', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="thousand-separator">Thousand Separator</Label>
            <Switch
              id="thousand-separator"
              checked={settings.thousandSeparator}
              onCheckedChange={(checked) => updateSetting('thousandSeparator', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-symbol">Currency Symbol</Label>
            <Input
              id="currency-symbol"
              value={settings.currencySymbol}
              onChange={(e) => updateSetting('currencySymbol', e.target.value)}
              placeholder="$"
              maxLength={3}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}