import CartItem from "./CartItem";
import Product from "./Product";
import User from "./User";
import Category from "./Category";

export interface ProductsReducerState {
  products: Product[];
  product?: Product;
  loading: boolean;
  error?: string;
}

export interface UsersReducerState {
  users: User[];
  loading: boolean;
  error?: string;
}

export interface CartReducerState {
  cartItems: CartItem[];
}

export interface AuthReducerState {
  accessToken?: string;
  currentUser?: User;
  error?: string;
}

export interface CategoriesReducerState {
  categories: Category[];
  loading: boolean
  error?: string;
}
