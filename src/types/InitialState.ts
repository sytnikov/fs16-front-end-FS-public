import CartItem from "./CartItem";
import Product from "./Product";
import User from "./User";
import Category from "./Category";
import CurrentUser from "./CurrentUser";
import Order from "./Order";

export type ProductsReducerState = {
  products: Product[];
  product?: Product;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export type CategoriesReducerState = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export type UsersReducerState = {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export type AuthReducerState = {
  accessToken: string;
  isValidUser?: boolean;
  currentUser?: CurrentUser;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export type CartReducerState = {
  cartItems: CartItem[];
}

export type OrdersReducerState = {
  orders: Order[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}
