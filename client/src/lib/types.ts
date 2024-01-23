export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  isAdmin: string;
  img?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  title: string;
  title_en: string;
  ingredients?: string[];
  ingredients_en?: string[];
  totalStars: number;
  starNumber: number;
  category: string;
  price: string;
  salePrice?: string;
  cover: string;
  images?: string;
  sales: number;
  desc?: string;
  desc_en?: string;
  isVegan: boolean;
  isNewIncome: boolean;
  isHot: boolean;
  isDeal: boolean;
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

export interface IProductInCart {
  productId: string;
  productImage: string;
  productName: string;
  productNameEn: string;
  productPrice: number;
  quantity: number;
}
export interface IOrder {
  _id?: string;
  userId?: string;
  name: string;
  phone: string;
  email?: string;
  address?: {
    city: string;
    street: string;
    apartment: string;
    portal: string;
  };
  products: IProductInCart[];
  orderNumber: number;
  totalPrice: number;
  delivery: "self_pickup" | "home_delivery";
  deliveryTime?: string;
  paymentMethod: "by_cash" | "by_card";
  comment?: string;
  orderStatus?:
    | "created"
    | "confirmed"
    | "preparing"
    | "delivering"
    | "completed"
    | "canceled";
  createdAt?: string;
  updatedAt?: string;
}
