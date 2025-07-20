
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Save, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { googleSheetsService } from '@/services/googleSheets';

interface GoogleSheetsSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleSheetsSettings: React.FC<GoogleSheetsSettingsProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    const savedUrl = googleSheetsService.getWebhookUrl();
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (webhookUrl.trim()) {
      googleSheetsService.setWebhookUrl(webhookUrl.trim());
      toast.success('تم حفظ إعدادات Google Sheets بنجاح');
    } else {
      localStorage.removeItem('googleSheetsWebhook');
      toast.success('تم إزالة إعدادات Google Sheets');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            إعدادات Google Sheets
          </CardTitle>
          <CardDescription>
            قم بتكوين webhook لإرسال بيانات النماذج إلى Google Sheets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook">رابط Google Sheets Webhook</Label>
            <Input
              id="webhook"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/..."
              className="ltr"
              dir="ltr"
            />
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>لإنشاء webhook:</p>
            <ol className="list-decimal list-inside space-y-1 mr-4">
              <li>افتح Google Apps Script</li>
              <li>أنشئ مشروع جديد</li>
              <li>أضف الكود المطلوب</li>
              <li>انشر كـ web app</li>
              <li>انسخ الرابط هنا</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1 gap-2">
              <Save className="w-4 h-4" />
              حفظ
            </Button>
            <Button onClick={onClose} variant="outline">
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleSheetsSettings;
