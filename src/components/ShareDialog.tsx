
import React from 'react';
import { Share2, MessageSquare, Send, Copy, Facebook, Instagram } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
  description?: string;
}

const ShareDialog = ({ open, onOpenChange, url, title, description }: ShareDialogProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "تم نسخ الرابط",
        description: "يمكنك الآن مشاركة الرابط",
      });
    } catch (err) {
      toast({
        title: "خطأ في النسخ",
        description: "يرجى نسخ الرابط يدوياً",
        variant: "destructive",
      });
    }
  };

  const shareToWhatsApp = () => {
    const message = `${title}\n${description || ''}\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToTelegram = () => {
    const message = `${title}\n${description || ''}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareToMessenger = () => {
    const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID`;
    window.open(messengerUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            مشاركة الرابط
          </DialogTitle>
          <DialogDescription>
            اختر منصة المشاركة المفضلة لديك
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3">
          {/* WhatsApp */}
          <Button
            variant="outline"
            onClick={shareToWhatsApp}
            className="flex items-center gap-2 justify-start"
          >
            <MessageSquare className="w-4 h-4 text-green-600" />
            واتساب
          </Button>

          {/* Telegram */}
          <Button
            variant="outline"
            onClick={shareToTelegram}
            className="flex items-center gap-2 justify-start"
          >
            <Send className="w-4 h-4 text-blue-500" />
            تليجرام
          </Button>

          {/* Facebook */}
          <Button
            variant="outline"
            onClick={shareToFacebook}
            className="flex items-center gap-2 justify-start"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            فيسبوك
          </Button>

          {/* Messenger */}
          <Button
            variant="outline"
            onClick={shareToMessenger}
            className="flex items-center gap-2 justify-start"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" />
            ماسنجر
          </Button>

          {/* Copy Link */}
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="col-span-2 flex items-center gap-2 justify-center"
          >
            <Copy className="w-4 h-4" />
            نسخ الرابط
          </Button>
        </div>

        {/* URL Display */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 break-all">{url}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
