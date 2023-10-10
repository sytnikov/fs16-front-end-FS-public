import UpdateProductInput from "./UpdateProductInput"

interface UpdateProductModalProps {
  isOpen: boolean,
  onClose: () => void,
  productId: number,
  onUpdateProduct: (updatingProduct: UpdateProductInput) => void
}

export default UpdateProductModalProps