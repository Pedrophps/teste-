import type { User as FirebaseUser } from 'firebase/auth';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brand: string;
  rating: number;
  stock: number;
  imagePlaceholderId: string;
};

export type Category = {
  id: string;
  name: string;
};

export type User = FirebaseUser;

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  shippingAddress: string;
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue';
};
