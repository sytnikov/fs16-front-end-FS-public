import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "../components/Header";
import Footer from "../components/Footer";

const RootPage = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default RootPage;
