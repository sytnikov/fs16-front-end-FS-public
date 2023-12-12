import { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import useAppDispatch from "../hooks/useAppDispatch";
import { createUserAsync } from "../redux/reducers/usersReducer";
import useAppSelector from "../hooks/useAppSelector";
import { ErrorMessage } from "../types/ErrorMessage";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({name: "", email: "", password: ""})
  // const [toast, setToast] = useState({open: false, created: false})
  // const formErrors: ErrorMessage[] = useAppSelector(state => state.usersReducer.error)

  // const errorMap: any = [];

  // formErrors?.forEach((error) => {
  //   const field = error.field.split('.')[1];
  //   if (field) {
  //     errorMap[field] = error.message;
  //   }
  // });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createUserAsync(userInfo));
      // if (resultAction.meta.requestStatus === 'fulfilled') {
      //   setToast({open: true, created: true})
      // }
    } catch (error) {
      alert("error")
    }
  };

  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setToast({...toast, open: false});
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (toast.created) {
  //       navigate("/login");
  //     }
  //   }, 3000)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [toast.created, navigate])

  return (
    <Container maxWidth="sm" sx={{ mt: 20, minHeight: "40rem" }}>
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" gutterBottom>
          Create a TopSpin Store account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={userInfo.name}
            onChange={onChangeHandler}
            margin="normal"
          />
          {/* {errorMap.name && <div>{errorMap.name}</div>} */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={userInfo.email}
            onChange={onChangeHandler}
            margin="normal"
          />
          {/* {errorMap.email && <div>{errorMap.email}</div>} */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={userInfo.password}
            onChange={onChangeHandler}
            margin="normal"
          />
          {/* {errorMap.password && <div>{errorMap.password}</div>} */}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </Box>
        </form>
        {/* <Snackbar open={toast.open} autoHideDuration={2500} onClose={handleClose}>
          <Alert onClose={handleClose} severity={"success"} sx={{color: "#ffff"}}>
            Account successfully created!
          </Alert>
        </Snackbar> */}
      </Paper>
    </Container>
  );
};

export default RegisterPage;
