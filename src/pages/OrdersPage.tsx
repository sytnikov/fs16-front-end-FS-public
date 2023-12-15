import { Box, Typography } from "@mui/material";

import OrdersList from "../components/OrdersList";

const OrdersPage = () => {

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
