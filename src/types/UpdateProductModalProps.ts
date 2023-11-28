import Product from "./Product";
import UpdateProductInput from "./UpdateProductInput";

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  product: Product;
  onUpdateProduct: (updatingProduct: UpdateProductInput) => void;
}

export default UpdateProductModalProps;
