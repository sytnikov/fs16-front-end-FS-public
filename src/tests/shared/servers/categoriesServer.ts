import { rest } from "msw";
import { setupServer } from "msw/node";

import categoriesData from "../../data/categoriesData";
import { baseURL } from "../../../common/common";

export const handlers = [
  rest.get(
    `${baseURL}/categories`,
    async (req, res, ctx) => {
      return res(ctx.json(categoriesData));
    }
  ),
];

const categoriesServer = setupServer(...handlers);
export default categoriesServer;
