
export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  googleId?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice?: number; // The price before discount
  price: number; // The final price after discount
  images: string[];
  inventory: number;
  collectionIds: string[];
  specialCategories: string[];
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  FULFILLED = 'FULFILLED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Price at time of purchase
}

export interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED';
}