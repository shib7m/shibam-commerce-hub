
import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AdminLoginDialog = ({ open, onOpenChange, onSuccess }: AdminLoginDialogProps) => {
  const [password, setPassword] = useState('');
  const { login } = useAdmin();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة الإدارة",
      });
      onSuccess();
      onOpenChange(false);
      setPassword('');
    } else {
      toast({
        title: "خطأ في كلمة المرور",
        description: "يرجى التحقق من كلمة المرور والمحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            تسجيل دخول الإدارة
          </DialogTitle>
          <DialogDescription>
            يرجى إدخال كلمة مرور الإدارة للوصول إلى لوحة التحكم
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            placeholder="كلمة مرور الإدارة"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            دخول
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginDialog;
