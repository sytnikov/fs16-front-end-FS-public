import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logoutUser, validateUserAsync } from "../redux/reducers/authReducer";
import ProtectedRouteProps from "../types/ProtectedRouteProps";

const ProtectedRouteAdmin = (props: ProtectedRouteProps) => {

  const { page: Page } = props;

  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserValidity = async () => {
      const isUserValid = await dispatch(validateUserAsync());
      if (!isUserValid.payload) {
        dispatch(logoutUser());
        navigate("/login");
      }
    };
    checkUserValidity();
  }, [dispatch, navigate]);

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  // }, [currentUser, navigate]);

  // useEffect(() => {
  //   if (!(currentUser?.role === "ADMIN")) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  return <Page />;
}

export default ProtectedRouteAdmin