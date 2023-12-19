import { createUserAsync, fetchAllUsersAsync } from "../../redux/reducers/usersReducer";
import { createStore } from "../../redux/store";
import CreateUserInput from "../../types/CreateUserInput";
import usersData from "../data/usersData";
import server from "../shared/servers/usersServer";

let store = createStore();
afterEach(() => {
  store = createStore();
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test async thunk usersReducer actions", () => {
  test("Should fetch all users", async () => {
    await store.dispatch(fetchAllUsersAsync());
    expect(store.getState().usersReducer.users.length).toBe(3);
  });

  test("Should create a new user", async () => {
    const inputData: CreateUserInput = {
      name: "John Doe",
      email: "john.doe2@mail.com",
      password: "password"
    };
    const response = await store.dispatch(createUserAsync(inputData));
    expect(response.meta.requestStatus).toBe("fulfilled")
    expect(usersData.length).toBe(4)
  });

});
