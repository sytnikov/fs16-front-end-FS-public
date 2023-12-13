type CurrentUser = {
  _id: string,
  name: string;
  email: string;
  role: string;
  permissions: string[];
  avatar: string;
  accessToken: string;
};

export default CurrentUser;
