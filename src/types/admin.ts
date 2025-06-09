
export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  description: string;
  image: string;
  media: MediaFile[];
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  media: MediaFile[];
  productCount: number;
  parentId?: string;
}
