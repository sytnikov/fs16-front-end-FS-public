import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import UpdateProductModalProps from "../types/UpdateProductModalProps";
import UpdateProductInput from "../types/UpdateProductInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 250,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  productId,
  product,
  onUpdateProduct,
}) => {
  const [updatingProductTitle, setUpdatingProductTitle] = useState(product.title);
  const [updatingProductPrice, setUpdatingProductPrice] = useState(String(product.price));
  const [updatingProductDescription, setUpdatingProductDescription] =
    useState(product.description);
  const [updatingProductCategoryId, setUpdatingProductCategoryId] =
    useState(String(product.category.id));
  const [updatingProductImages, setUpdatingProductImages] = useState(String(product.images));

  const updatingProduct: UpdateProductInput = {
    id: productId,
    update: {
      title: updatingProductTitle,
      price: Number(updatingProductPrice),
      description: updatingProductDescription,
      categoryId: Number(updatingProductCategoryId),
      images: Array(updatingProductImages),
    },
  };

  const onUpdateClick = () => {
    onUpdateProduct(updatingProduct);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Updating a product
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          variant="outlined"
          label="Title"
          value={updatingProductTitle}
          onChange={(e) => setUpdatingProductTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Price"
          value={updatingProductPrice}
          onChange={(e) => setUpdatingProductPrice(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          type="text"
          label="Description"
          value={updatingProductDescription}
          onChange={(e) => setUpdatingProductDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Category ID"
          value={updatingProductCategoryId}
          onChange={(e) => setUpdatingProductCategoryId(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="text"
          label="Image link"
          value={updatingProductImages}
          onChange={(e) => setUpdatingProductImages(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={onUpdateClick}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;
