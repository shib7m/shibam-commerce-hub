
import React, { useState } from 'react';
import { Minus, Plus, Trash2, Home, ArrowLeft, Share2, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareDialog from '@/components/ShareDialog';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  
  const shippingCost = 50; // Fixed shipping cost
  const subtotal = getCartTotal();
  const total = subtotal + (cartItems.length > 0 ? shippingCost : 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Create WhatsApp message
    const message = `مرحباً، أريد طلب المنتجات التالية:\n\n${cartItems.map((item, index) => 
      `${index + 1}. ${item.name}\n   الكمية: ${item.quantity}\n   السعر: $${item.price}\n   المجموع: $${item.price * item.quantity}\n`
    ).join('\n')}\n\nالمجموع الفرعي: $${subtotal}\nتكلفة الشحن: $${shippingCost}\nالمجموع الكلي: $${total}\n\nأرجو التواصل معي لتأكيد الطلب.`;
    
    const whatsappUrl = `https://wa.me/96777749263?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareCart = () => {
    setIsShareDialogOpen(true);
  };

  const getCartShareUrl = () => {
    // Create a URL with cart items as query parameters
    const cartData = btoa(JSON.stringify(cartItems));
    return `${window.location.origin}/cart?shared=${cartData}`;
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
          <span className="text-gray-600">سلة التسوق</span>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">سلة التسوق ({cartItems.length} منتج)</h1>
                  {cartItems.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleShareCart}
                      className="flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      مشاركة السلة
                    </Button>
                  )}
                </div>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-xl font-semibold mb-2">سلة التسوق فارغة</h2>
                    <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات بعد</p>
                    <Link to="/">
                      <Button>ابدأ التسوق الآن</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          loading="lazy"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-brand-blue font-bold">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-lg">${item.price * item.quantity}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            حذف
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>تكلفة الشحن:</span>
                      <span>${shippingCost}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع الكلي:</span>
                      <span className="text-brand-blue">${total}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white mb-3"
                    size="lg"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    إتمام الطلب عبر واتساب
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    سيتم توجيهك إلى واتساب لتأكيد الطلب
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Share Dialog */}
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        url={getCartShareUrl()}
        title="سلة التسوق - شبام للتجارة"
        description={`سلة تحتوي على ${cartItems.length} منتج بقيمة $${total}`}
      />
    </div>
  );
};

export default Cart;
