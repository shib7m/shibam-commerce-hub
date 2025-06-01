
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp message
    const whatsappMessage = `مرحباً، أريد التواصل معكم:\n\nالاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nالهاتف: ${formData.phone}\nالموضوع: ${formData.subject}\n\nالرسالة:\n${formData.message}`;
    const whatsappUrl = `https://wa.me/96777749263?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="flex items-center gap-1 text-brand-blue hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <span className="text-gray-400">←</span>
          <span className="text-gray-600">اتصل بنا</span>
        </div>

        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للخلف
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📞 اتصل بنا</h1>
          <p className="text-gray-600 text-lg">نحن هنا لمساعدتك! تواصل معنا في أي وقت</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-brand-blue" />
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Phone className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-gray-800">الهاتف</p>
                    <p className="text-gray-600">+967 77 749 263</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-gray-800">البريد الإلكتروني</p>
                    <p className="text-gray-600">info@shabam.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-gray-800">العنوان</p>
                    <p className="text-gray-600">صنعاء - شارع القيادة</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-800">واتساب</p>
                    <p className="text-gray-600">متاح 24/7 للاستفسارات</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle>ساعات العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>السبت - الخميس:</span>
                    <span className="font-semibold">8:00 ص - 10:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة:</span>
                    <span className="font-semibold">2:00 م - 10:00 م</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-brand-blue" />
                أرسل لنا رسالة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="الاسم الكامل *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="text-right"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="text-right"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="phone"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-right"
                  />
                  <Input
                    name="subject"
                    placeholder="موضوع الرسالة *"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="text-right"
                  />
                </div>
                
                <Textarea
                  name="message"
                  placeholder="نص الرسالة *"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="text-right"
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-blue hover:bg-blue-600 text-white"
                  size="lg"
                >
                  <Send className="w-4 h-4 ml-2" />
                  إرسال الرسالة عبر واتساب
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  * الحقول المطلوبة. سيتم إرسال رسالتك عبر واتساب مباشرة.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
