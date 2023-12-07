import { rest } from "msw";
import { setupServer } from "msw/node";
import { AxiosError } from "axios";

import productsData from "../../data/productsData";
import CreateProductInput from "../../../types/CreateProductInput";
import Product from "../../../types/Product";
import categoriesData from "../../data/categoriesData";
import { baseURL } from "../../../common/common";

const productURL = `${baseURL}/products`

export const handlers = [
  rest.get(productURL, (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),
  rest.get("https://api.escuelajs.co/api/v1/products/1", (req, res, ctx) => {
    return res(ctx.json(productsData[0]));
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/products",
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
          categoryId: category._id,
          images: inputData.images,
        };
        productsData.push(newProduct);
        return res(ctx.json(newProduct));
      } else {
        ctx.json({
          path: "/api/v1/products",
          timestamp: "2023-10-09T20:38:15.852Z",
          name: "EntityNotFoundError",
          message:
            'Could not find any entity of type "Category" matching: {\n    "id": 170\n}',
        });
      }
    }
  ),
  rest.put(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const update = await req.json();
      const { id } = req.params;
      const foundIndex = productsData.findIndex((p) => p._id === id);
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
              message:
                'Could not find any entity of type "Product" matching: {\n    "relations": [\n        "category"\n    ],\n    "where": {\n        "id": 5\n    }\n}',
            })
          );
        }
      } catch (e) {
        const error = e as AxiosError;
      }
    }
  ),
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      if (productsData.find((p) => p._id === id)) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
];

const productsServer = setupServer(...handlers);
export default productsServer;
