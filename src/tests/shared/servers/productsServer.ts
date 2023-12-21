import { rest } from "msw";
import { setupServer } from "msw/node";
import { AxiosError } from "axios";

import productsData from "../../data/productsData";
import CreateProductInput from "../../../types/CreateProductInput";
import Product from "../../../types/Product";
import categoriesData from "../../data/categoriesData";
import { testURL } from "../../../common/common";

export const handlers = [
  rest.get(`${testURL}/products`, (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  rest.get(
    `${testURL}/products/:_id`,
    async (req, res, ctx) => {
      const { _id } = req.params;
      const product = productsData.find((item) => item._id === _id);
      if (product) {
        return res(ctx.json(product));
      } else {
        ctx.status(400);
        ctx.json({
          message: ["message: Could not find any entity of type"],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),

  rest.post(
    `${testURL}/products`,
    async (req, res, ctx) => {
      const inputData: CreateProductInput = await req.json();
      const category = categoriesData.find(
        (c) => c._id === inputData.categoryId
      );
      if (category) {
        const newProduct: Product = {
          _id: String(productsData.length + 1),
          name: inputData.name,
          price: inputData.price,
          description: inputData.description,
          categoryId: category,
          images: inputData.images,
        };
        productsData.push(newProduct);
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
  rest.put(
    `${testURL}/products/:_id`,
    async (req, res, ctx) => {
      const update = await req.json();
      const { _id } = req.params;
      const foundIndex = productsData.findIndex((p) => p._id === _id);
      try {
        if (foundIndex > -1) {
          return res(
            ctx.json({
              ...productsData[foundIndex],
              ...update,
            })
          );
        } else {
          ctx.status(400);
          return res(
            ctx.json({
              message: [
                "price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array",
              ],
              error: "Bad Request",
              statusCode: 400,
            })
          );
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log('👀 There is an error happened: ', error.message)
      }
    }
  ),
  rest.delete(
    `${testURL}/products/:_id`,
    (req, res, ctx) => {
      const { _id } = req.params;
      if (productsData.find((p) => p._id === _id)) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
];

const productsServer = setupServer(...handlers);
export default productsServer;
