import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import localStorage from "redux-persist/es/storage";
import { logoutUser } from "../redux/reducers/authReducer";

const Header = () => {
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);

  // when going back to Home page bring back LogIn button
  useEffect(() => { 
    if (location.pathname === "/") {
      setIsLoginPage(false);
    }
  }, [location.pathname]);

  const onToggleAuth = () => {
    if (!isLoginPage) {
      navigate("login");
      setIsLoginPage(true);
    } else {
      navigate("signup");
      setIsLoginPage(false);
    }
  };

  const showMenu = !["/login", "/signup"].includes(location.pathname);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onProfileClick = () => {
    navigate("/profile")
  };

  const onLogoutClick = () => {
    dispatch(logoutUser)
    navigate("/")
  };
  // dropdown menu section ends
  return (
    <div>
      <nav>
        {showMenu && (
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="users">Users</Link>
            </li>
            <li>
              <Link to="profile">Profile</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
            </li>
          </ul>
        )}
        {!showMenu && <button onClick={() => navigate("/")}>Home</button>}
        {!currentUser && (
          <button onClick={onToggleAuth}>
            {!isLoginPage ? "Log In" : "Sign Up"}
          </button>
        )}
        {currentUser && (
          <div>
            <button onClick={toggleDropdown}>Account</button>
            {isDropdownOpen && (
              <div>
                <button onClick={onProfileClick}>Profile</button>
                <button onClick={onLogoutClick}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
