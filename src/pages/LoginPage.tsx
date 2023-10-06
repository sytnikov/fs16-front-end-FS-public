import { FormEvent, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { authUserAsync, loginUserAsync } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const accessToken = useAppSelector(state => state.authReducer.accessToken)

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUserAsync({email, password}))
    navigate("/")
  };

  return (
    <div>
      <p>LoginPage</p>
      <form onSubmit={onLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
