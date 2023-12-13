import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import OrdersList from "../components/OrdersList";

const OrdersPage = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ minHeight: "40rem" }}>
      <Box>
        <Box className="heading">
          <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
            Orders list
          </Typography>
        </Box>
        <OrdersList />
      </Box>
    </Box>
  );
};

export default OrdersPage;
