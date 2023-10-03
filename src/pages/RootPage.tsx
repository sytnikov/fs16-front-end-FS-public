import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const RootPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default RootPage;