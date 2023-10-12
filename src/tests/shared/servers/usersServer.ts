import { rest } from "msw";
import { setupServer } from "msw/node";

import usersData from "../../data/usersData";
import CreateUserInput from "../../../types/CreateUserInput";
import User from "../../../types/User";

export const access_token = "test-access-token"

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(usersData))
  }),
  rest.post("https://api.escuelajs.co/api/v1/auth/login", async (req, res, ctx) => {
    const {email, password} = await req.json()
    const foundUser = usersData.find(u => u.email === email && u.password === password)
    if (foundUser) {
      return res(ctx.json({access_token: access_token + "_" + foundUser.id}))
    } else {
      ctx.status(401)
      return res(ctx.json("Cannot authenticate user"))
    }
  }),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1]
    const originalToken = token?.split("_")[0]
    const userId = token?.split("_")[1]
    const user = usersData.find(u => u.id === Number(userId))
    if (user && originalToken === access_token) {
      return res(ctx.json(user))
    } else {
      ctx.status(401)
      return res(ctx.json("Cannot get user profile"))
    }
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/users",
    async (req, res, ctx) => {
      const inputData: CreateUserInput = await req.json();
      const role = "customer"
      if (inputData) {
        const newUser: User = {
          id: usersData.length + 1,
          name: inputData.name,
          email: inputData.email,
          password: inputData.password,
          role: role,
          avatar: inputData.avatar,
        };
        usersData.push(newUser);
        return res(ctx.json(newUser));
      } else {
        ctx.json({
          message: "Unexpected token } in JSON at position 87",
          error: "Bad Request",
          statusCode: 400
        });
      }
    }
  ),
];

const usersServer = setupServer(...handlers);
export default usersServer;
