import CreateProductInput from "./CreateProductInput"

interface AddProductModalProps {
  isOpen: boolean,
  onClose: () => void,
  onAddProduct: (newProduct: CreateProductInput) => void
}

export default AddProductModalProps