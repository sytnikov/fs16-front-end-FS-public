import { rest } from "msw";
import { setupServer } from "msw/node";

import categoriesData from "../../data/categoriesData";
import { testURL } from "../../../common/common";

export const handlers = [
  rest.get(
    `${testURL}/categories`,
    async (req, res, ctx) => {
      return res(ctx.json(categoriesData));
    }
  ),
];

const categoriesServer = setupServer(...handlers);
export default categoriesServer;
