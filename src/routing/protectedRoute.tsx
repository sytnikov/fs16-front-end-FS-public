import { useEffect } from "react";

import ProtectedRouteProps from "../types/ProtectedRouteProps";
import useAppSelector from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { logoutUser, validateUserAsync } from "../redux/reducers/authReducer";

const ProtectedRoute = (props: ProtectedRouteProps) => {

  const { page: Page } = props;

  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const isUserValid = useAppSelector((state) => state.authReducer.isValidUser)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(validateUserAsync())
  //   if (!isUserValid) {
  //     dispatch(logoutUser())
  //     navigate("/login");
  //   }
  // }, [isUserValid, navigate, dispatch])

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

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!(currentUser?.role === "ADMIN")) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  return <Page />

}

export default ProtectedRoute