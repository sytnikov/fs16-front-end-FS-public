import { fetchAllCategoriesAsync } from "../../redux/reducers/categoriesReducer";
import { createStore } from "../../redux/store";
import server from "../shared/servers/categoriesServer";

let store = createStore();
afterEach(() => {
  store = createStore();
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test async thunk categoriesReducer actions", () => {
  test("Should fetch all categories", async () => {
    await store.dispatch(fetchAllCategoriesAsync());
    expect(store.getState().categoriesReducer.categories.length).toBe(4);
  });
});
