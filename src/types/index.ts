
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; // This will store base64 image data
  category: string;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  isAdmin: boolean;
}
