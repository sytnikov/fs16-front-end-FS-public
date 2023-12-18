import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import CartCardProps from "../types/CartCardProps";

const CartCard = ({
  cartItem,
  onDeleteFromCart,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: CartCardProps) => (
  <Box>
    <Card sx={{ maxWidth: 800, display: { xs: "none", md: "flex" } }}>
      <CardMedia sx={{ minWidth: 300 }} image={cartItem.images[0]} />
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {cartItem.name}
          </Typography>
          <Typography variant="h6" color="text.primary">
            Price: {cartItem.price}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", mt: 3, mb: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{ fontWeight: 900 }}
            onClick={() => onDecreaseQuantity(cartItem._id)}
          >
            -
          </Button>
          <Box sx={{ ml: 2, mr: 2 }}>
            <Typography variant="h6" color="text.primary">
              {cartItem.quantity}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{ fontWeight: 900 }}
            onClick={() => onIncreaseQuantity(cartItem._id)}
          >
            +
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ ml: 5 }}
            onClick={() => onDeleteFromCart(cartItem)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>

    <Card
      sx={{
        maxWidth: 800,
        display: { xs: "flex", md: "none" },
        flexDirection: "column",
      }}
    >
      <CardMedia sx={{ minHeight: 200 }} image={cartItem.images[0]} />
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {cartItem.name}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 900 }}
          >
            ${cartItem.price}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", mt: 3, mb: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{ fontWeight: 900 }}
            onClick={() => onDecreaseQuantity(cartItem._id)}
          >
            -
          </Button>
          <Box sx={{ ml: 2, mr: 2 }}>
            <Typography variant="h6" color="text.primary">
              {cartItem.quantity}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{ fontWeight: 900 }}
            onClick={() => onIncreaseQuantity(cartItem._id)}
          >
            +
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ ml: 5 }}
            onClick={() => onDeleteFromCart(cartItem)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default CartCard;
