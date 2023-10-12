import { createStore } from "../../redux/store";

import productsReducer, {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductsAsync,
  fetchSingleProductAsync,
  initialState,
  sortByPrice,
  updateProductAsync,
} from "../../redux/reducers/productsReducer";
import productsData from "../data/productsData";
import { ProductsReducerState } from "../../types/InitialState";
import server from "../shared/servers/productsServer";
import CreateProductInput from "../../types/CreateProductInput";
import UpdateProductInput from "../../types/UpdateProductInput";

let store = createStore();
afterEach(() => {
  store = createStore();
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test normal productsReducer actions", () => {
  test("Should sort products by price in ascending order", () => {
    const state: ProductsReducerState = {
      products: productsData,
      loading: false,
    };
    const products = productsReducer(state, sortByPrice("asc")).products;
    expect(products[0]).toBe(productsData[1]);
    expect(products[1]).toBe(productsData[0]);
  });

  test("Should sort products by price in descending order", () => {
    const state: ProductsReducerState = {
      products: productsData,
      loading: false,
    };
    const products = productsReducer(state, sortByPrice("desc")).products;
    expect(products[0]).toBe(productsData[2]);
    expect(products[1]).toBe(productsData[0]);
  });

  test("Should return initial state", () => {
    const state = productsReducer(initialState, {
      payload: undefined,
      type: undefined,
    });
    expect(state).toMatchObject(initialState);
  });
});

describe("Test async thunk productsReducer actions", () => {
  test("Should fetch all products with pagination", async () => {
    await store.dispatch(fetchAllProductsAsync({ limit: 20, offset: 0 }));
    expect(store.getState().productsReducer.products.length).toBe(3);
  });

  test("Should fetch one product", async () => {
    await store.dispatch(fetchSingleProductAsync(productsData[0].id));
    const product = store.getState().productsReducer.product;
    if (product) {
      expect(product).toMatchObject(productsData[0]);
    }
  });

  test("Should create a new product", async () => {
    const inputData: CreateProductInput = {
      title: "test title",
      price: 200,
      description: "test description",
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createProductAsync(inputData));
    expect(store.getState().productsReducer.products.length).toBe(1);
  });

  test("Should update a product", async () => {
    const input: UpdateProductInput = {
      id: 1,
      update: {
        title: "Successfully updated product",
        price: 129,
      },
    };
    const action = await store.dispatch(updateProductAsync(input));
    expect(action.payload).toMatchObject({
      id: 1,
      title: "Successfully updated product",
      price: 129,
      description:
        "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      images: [
        "https://i.imgur.com/DumuKkD.jpeg",
        "https://i.imgur.com/imQx3Az.jpeg",
        "https://i.imgur.com/aCDF0yh.jpeg",
      ],
      category: {
        id: 3,
        name: "Chaii",
        image: "https://i.imgur.com/rUWNzYa.jpeg",
      },
    });
  });

  test("Should delete an existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(1));
    expect(resultAction.payload).toBe(1);
  });

  test("Should throw an error while deleting a non-existing product", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(400));
    expect(resultAction.payload).toBe("The product cannot be deleted");
  });
});
