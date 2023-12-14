import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import UpdateProductModalProps from "../types/UpdateProductModalProps";
import UpdateProductInput from "../types/UpdateProductInput";
import useAppDispatch from "../hooks/useAppDispatch";

const UpdateProductModal: FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  productId,
  product,
  onUpdateProduct,
}) => {
  const dispatch = useAppDispatch()

  const [updatingProductInfo, setUpdatingProductInfo] = useState<UpdateProductInput>({
    _id: productId,
    update: {
      name: product.name,
      price: product.price,
      description: product.description,
      images: product.images,
      stock: product.stock,
    }
  });
  console.log('updatingProductInfo:', updatingProductInfo)
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdatingProductInfo((prevState) => ({
      ...prevState,
      update: {
        ...prevState.update,
        [name]: value,
      },
    }));
  };

  const onUpdateClick = () => {
    onUpdateProduct(updatingProductInfo);
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
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 280,
          bgcolor: "background.paper",
          border: "none",
          borderRadius: "6px",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Updating a product
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          variant="outlined"
          name="name"
          label="Title"
          value={updatingProductInfo.update.name}
          onChange={onChangeHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="price"
          label="Price"
          value={updatingProductInfo.update.price}
          onChange={onChangeHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          type="text"
          name="description"
          label="Description"
          value={updatingProductInfo.update.description}
          onChange={onChangeHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          type="text"
          name="images"
          label="Image link"
          value={updatingProductInfo.update.images}
          onChange={onChangeHandler}
        />
        <Button fullWidth variant="contained" onClick={onUpdateClick}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;



