import authReducer, { loginUserAsync, logoutUser } from "../../redux/reducers/authReducer";
import { createStore } from "../../redux/store";
import { AuthReducerState } from "../../types/InitialState";
import usersData from "../data/usersData";
import server, { access_token } from "../shared/servers/usersServer";

let store = createStore();
afterEach(() => {
  store = createStore();
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const currentUser = {
  _id: "1",
  email: "john@mail.com",
  password: "changeme",
  name: "Jhon",
  role: "customer",
  avatar: "https://i.imgur.com/kTPCFG2.jpeg",
  accessToken: "",
  permissions: ["READ"]
}

describe("Test normal authReducer actions", () => {
  test("Should reset a currentUser when logged out", () => {
    const state: AuthReducerState = {
      currentUser: currentUser,
      accessToken: "",
      isLoading: false,
      isError: false,
      message: ""
    }
    const updatedState = authReducer(state, logoutUser())
    expect(updatedState.currentUser).toBe(undefined)
  })
})

describe("Test async thunk authReducer actions", () => {
  test("Should login user with valid credentials", async ()=>{
    const response = await store.dispatch(loginUserAsync({email: "john@mail.com", password: "changeme" }))
    console.log('response:', response)
    expect(response.payload).toBe(`test-access-token_${usersData[0]._id}`)
  })
  
})