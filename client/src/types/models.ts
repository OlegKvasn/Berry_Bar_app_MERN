export interface IUser {
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

export interface IProduct {
  _id: string;
  title: string;
  ingredients?: string[];
  totalStars: number;
  starNumber: number;
  category: string;
  price: string;
  cover: string;
  images?: string;
  sales: string;
  desc?: string;
  createdAt: string;
  updatedAt: string;
}
export interface IReview {
  _id: string;
  productId: string;
  userId: string;
  star: 1 | 2 | 3 | 4 | 5;
  desc?: string;
  createdAt: string;
  updatedAt: string;
}
