export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  isAdmin: string;
  img?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  title: string;
  ingredients: string;
  totalStars: string;
  starNumber: string;
  category: string;
  price: string;
  cover: string;
  images: string;
  sales: string;
  desc?: string;
  createdAt: string;
  updatedAt: string;
}
