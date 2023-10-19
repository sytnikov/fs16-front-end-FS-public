import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const RootPage = () => {
  return (
    <Box sx={{height: "100%"}}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default RootPage;
