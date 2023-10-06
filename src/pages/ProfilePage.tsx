import { current } from "@reduxjs/toolkit";
import useAppSelector from "../hooks/useAppSelector";

const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);

  return (
    <div>
      <p>ProfilePage</p>
      {currentUser && (
        <div>
          <p>{currentUser.name}</p>
          <p>{currentUser.email}</p>
          <p>{currentUser.role}</p>
          <img src={currentUser.avatar} alt="user avatar pic" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
