
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string; 
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
