
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Gift } from 'lucide-react';
import SuccessAnimation from './SuccessAnimation';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^7\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber) {
      setError('يرجى إدخال رقم الهاتف');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('يجب أن يبدأ الرقم بـ 7 ويتكون من 9 أرقام');
      return;
    }

    // Save registration data
    const registrationData = {
      phoneNumber,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('ar-YE'),
      time: new Date().toLocaleTimeString('ar-YE')
    };

    // Get existing registrations or initialize empty array
    const existingRegistrations = JSON.parse(localStorage.getItem('phoneRegistrations') || '[]');
    existingRegistrations.push(registrationData);
    localStorage.setItem('phoneRegistrations', JSON.stringify(existingRegistrations));

    // Track popup visits
    const visitCount = parseInt(localStorage.getItem('popupVisits') || '0') + 1;
    localStorage.setItem('popupVisits', visitCount.toString());

    setIsRegistered(true);
  };

  const handleClose = () => {
    setPhoneNumber('');
    setError('');
    setIsRegistered(false);
    onOpenChange(false);
  };

  const handleGoToHomepage = () => {
    handleClose();
    window.location.href = '/';
  };

  if (isRegistered) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <SuccessAnimation onComplete={handleGoToHomepage} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-brand-blue mb-4">
            🎉 عرض خاص!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-brand-blue to-blue-600 text-white p-4 rounded-lg">
            <Gift className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-lg font-bold mb-2">أدخل رقم هاتفك واحصل على خصم 10%</h3>
            <p className="text-sm opacity-90">على أي منتج في المتجر!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="tel"
                placeholder="712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pr-10 text-right"
                maxLength={9}
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="text-xs text-gray-500 text-center">
              يجب أن يبدأ الرقم بـ 7 ويتكون من 9 أرقام
            </div>

            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3"
            >
              احصل على الخصم 🎁
            </Button>
          </form>

          <div className="text-xs text-gray-400 text-center">
            * العرض ساري لفترة محدودة
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
