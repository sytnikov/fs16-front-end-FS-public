import CartItem from "./CartItem"
import Product from "./Product"
import User from "./User"
import Category from "./Category"

export interface ProductsReducerState {
  products: Product[]
  loading: boolean
  error?: string
}

export interface CartReducerState {
  cartItems: CartItem[]
}

export interface UsersReducerState {
  users: User[],
  error?: string
}

export interface AuthReducerState {
  accessToken?: string,
  isAuthenticated?: boolean
  currentUser?: User,
  error?: string
}

export interface CategoriesReducerState {
  categories: Category[],
  error?: string
}