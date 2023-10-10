import { useState } from "react";

import UpdateProductModalProps from "../types/UpdateProductModalProps";
import UpdateProductInput from "../types/UpdateProductInput";

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  productId,
  onUpdateProduct,
}) => {
  const [updatingProductTitle, setUpdatingProductTitle] = useState("");
  const [updatingProductPrice, setUpdatingProductPrice] = useState("");
  const [updatingProductDescription, setUpdatingProductDescription] = useState("");
  const [updatingProductCategoryId, setUpdatingProductCategoryId] = useState("");
  const [updatingProductImages, setUpdatingProductImages] = useState("");
  
  const updatingProduct: UpdateProductInput = {
    id: productId,
    update: {
      title: updatingProductTitle,
      price: Number(updatingProductPrice),
      description: updatingProductDescription,
      categoryId: Number(updatingProductCategoryId),
      images: Array(updatingProductImages),
    }
  };

  const onUpdateClick = () => {
    onUpdateProduct(updatingProduct);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div>
        <span onClick={onClose}>&times;</span>
        <h2>Update a product</h2>
        <input
          type="text"
          placeholder="Title"
          value={updatingProductTitle}
          onChange={(e) => setUpdatingProductTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={updatingProductPrice}
          onChange={(e) => setUpdatingProductPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={updatingProductDescription}
          onChange={(e) => setUpdatingProductDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Category ID"
          value={updatingProductCategoryId}
          onChange={(e) => setUpdatingProductCategoryId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image link"
          value={updatingProductImages}
          onChange={(e) => setUpdatingProductImages(e.target.value)}
        />
        <button onClick={onUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default UpdateProductModal;
