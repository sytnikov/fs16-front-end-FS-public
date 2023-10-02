import { Product } from "./Product"

interface InitialState {
  products: Product[]
  loading: boolean
  error?: string
}

export default InitialState