import authReducer, { authUserAsync, loginUserAsync, logoutUser } from "../../redux/reducers/authReducer";
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

describe("Test normal authReducer actions", () => {
  test("Should set a currentUser when logged out", () => {
    const state: AuthReducerState = {
      currentUser: usersData[0]
    }
    const updatedState = authReducer(state, logoutUser())
    expect(updatedState.currentUser).toBe(undefined)
  })
})

describe("Test async thunk authReducer actions", () => {
  test("Should authenticate a user", async () => {
    await store.dispatch(authUserAsync(access_token + "_3"))
    expect(store.getState().authReducer.currentUser).toMatchObject(usersData[2])
  })
  test("Should login user with valid credentials", async ()=>{
    await store.dispatch(loginUserAsync({email: "john@mail.com", password: "changeme" }))
    expect(store.getState().authReducer.currentUser).toMatchObject(usersData[0])
  })
  
})