import Category from "./Category";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: Category;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export default Product;
