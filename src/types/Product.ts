import Category from "./Category";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  stock?: number,
  creationAt?: string;
  updatedAt?: string;
}

export default Product;
