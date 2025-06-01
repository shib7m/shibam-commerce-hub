
import React from 'react';
import { Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  inStock: boolean;
}

interface AddProductFormProps {
  newProduct: Product;
  setNewProduct: (product: Product) => void;
  onAddProduct: () => void;
}

const AddProductForm = ({ newProduct, setNewProduct, onAddProduct }: AddProductFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="اسم المنتج"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input
            type="number"
            placeholder="السعر"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
          />
          <Input
            placeholder="القسم"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
          />
          <Input
            placeholder="رابط الصورة"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
        </div>
        <Textarea
          placeholder="وصف المنتج"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
        />
        <Button onClick={onAddProduct} className="bg-brand-blue hover:bg-blue-600">
          <Save className="w-4 h-4 ml-2" />
          حفظ المنتج
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
