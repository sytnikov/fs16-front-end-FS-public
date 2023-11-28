import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchSingleProductAsync } from "../redux/reducers/productsReducer";
import { addToCart } from "../redux/reducers/cartReducer";
import Product from "../types/Product";

const SingleProductPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productId = Number(params.productId);
  const product = useAppSelector((state) => state.productsReducer.product);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, []);

  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "24px", minHeight: "" }}>
      {product && (
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Avatar
                src={product.images[0]}
                alt="product image"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Category: {product.category.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${product.price}
              </Typography>
              <Button
                size="small"
                variant="contained"
                endIcon={<AddShoppingCartIcon />}
                onClick={() => onAddToCart(product)}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default SingleProductPage;
