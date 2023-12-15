import { rest } from "msw";
import { setupServer } from "msw/node";

import categoriesData from "../../data/categoriesData";

export const handlers = [
  rest.get("https://fullstack-backend-juzm.onrender.com/categories", (req, res, ctx) => {
    return res(ctx.json(categoriesData))
  }),
];

const categoriesServer = setupServer(...handlers);
export default categoriesServer;