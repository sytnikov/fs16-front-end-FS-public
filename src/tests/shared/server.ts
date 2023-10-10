import { rest } from "msw";
import { setupServer } from "msw/node";

import productsData from "../data/productsData";
import CreateProductInput from "../../types/CreateProductInput";
import Product from "../../types/Product";
import categoriesData from "../data/categoriesData";

export const handlers = [
  // rest.get("/api/user", (req, res, ctx) => {
  //   return res(ctx.json("John Smith"), ctx.delay(150));
  // }),
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      if (productsData.find((p) => p.id === Number(id))) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
  rest.post(
    "https://api.escuelajs.co/api/v1/products",
    async (req, res, ctx) => {
      const inputData: CreateProductInput = await req.json();
      const category = categoriesData.find(
        (c) => c.id === inputData.categoryId
      );
      if (category) {
        const newProduct: Product = {
          id: productsData.length + 1,
          title: inputData.title,
          price: inputData.price,
          description: inputData.description,
          category: category,
          images: inputData.images,
        };
        productsData.push(newProduct)
        return res(ctx.json(newProduct));
      } else {
        ctx.json({
          path: "/api/v1/products",
          timestamp: "2023-10-09T20:38:15.852Z",
          name: "EntityNotFoundError",
          message: "Could not find any entity of type \"Category\" matching: {\n    \"id\": 170\n}"
        })
      }
      
    }
  ),
];

const server = setupServer(...handlers);
export default server;
