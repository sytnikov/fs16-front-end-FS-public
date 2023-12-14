import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";

import ProductCardProps from "../types/ProductCardProps";
import useAppDispatch from "../hooks/useAppDispatch";
import Product from "../types/Product";
import { addToCart } from "../redux/reducers/cartReducer";

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart")
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box onClick={() => handleProductClick(product._id)}>
        <CardMedia sx={{ height: 180 }} image={product.images[0]} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            ${product.price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ gap: 1 }}>
        <Button
          size="small"
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
