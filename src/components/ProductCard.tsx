import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ProductCardProps from "../types/ProductCardProps";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import UpdateProductInput from "../types/UpdateProductInput";
import {
  deleteProductAsync,
  updateProductAsync,
} from "../redux/reducers/productsReducer";
import Product from "../types/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import UpdateProductModal from "./UpdateProductModal";

const ProductCard = ({ product }: ProductCardProps) => {
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const onOpenUpdateProduct = (productId: number) => {
    setIsUpdateProductOpen(true);
    setUpdatingProduct(productId);
  };
  const onCloseUpdateProduct = () => {
    setIsUpdateProductOpen(false);
    setUpdatingProduct(0);
  };

  const onUpdateProduct = (updatedProduct: UpdateProductInput) => {
    dispatch(updateProductAsync(updatedProduct));
    setIsUpdateProductOpen(false);
  };
  // deleting a product
  const onDeleteProduct = (id: number) => {
    dispatch(deleteProductAsync(id));
  };

  // adding a new item to cart
  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box onClick={() => handleProductClick(product.id)}>
        <CardMedia sx={{ height: 140 }} image={product.images[0]} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.id} {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            ${product.price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Button size="small" onClick={() => onAddToCart(product)}>
          Add to cart
        </Button>
        {currentUser && currentUser.role === "admin" && (
          <Box>
            <Button
              size="small"
              onClick={() => onOpenUpdateProduct(product.id)}
            >
              Update
            </Button>
            {isUpdateProductOpen && updatingProduct === product.id && (
              <UpdateProductModal
                isOpen={isUpdateProductOpen}
                onClose={onCloseUpdateProduct}
                productId={updatingProduct}
                onUpdateProduct={onUpdateProduct}
              />
            )}
            <Button size="small" onClick={() => onDeleteProduct(product.id)}>
              Delete
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
