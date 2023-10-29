
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  messageCreateReducer,
  messageDeleteReducer,
  messageListReducer,
  messageUpdateReducer,
} from "./reducers/messagesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  messageList: messageListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  messageCreate: messageCreateReducer,
  messageDelete: messageDeleteReducer,
  messageUpdate: messageUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

