import Product from "./Product";
import UpdateProductInput from "./UpdateProductInput";

type UpdateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  product: Product;
  onUpdateProduct: (updatingProduct: UpdateProductInput) => void;
}

export default UpdateProductModalProps;
