import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logoutUser, reset, validateUserAsync } from "../redux/reducers/authReducer";
import ProtectedRouteProps from "../types/ProtectedRouteProps";

const ProtectedRoute = (props: ProtectedRouteProps) => {

  const { page: Page } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserValidity = async () => {
      const isUserValid = await dispatch(validateUserAsync());
      if (!isUserValid.payload) {
        dispatch(logoutUser());
        dispatch(reset())
        navigate("/login");
      }
    };
    checkUserValidity();
  }, [dispatch, navigate]);

  return <Page />;
}

export default ProtectedRoute