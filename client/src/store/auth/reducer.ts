import { IAction } from "./../../types/IStoreT";
import { IAuthState } from "../../types/IStoreT";
import { RESET_LOGOUT_DATA, SET_LOAD_ME_DATA, SET_MESSAGE } from "./actions";

const initialState: IAuthState = {
  _id: "",
  email: "",
  login: "",
  message: "",
};

const authReducer = (
  state: IAuthState = initialState,
  action: IAction<IAuthState>
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
      };
    case SET_LOAD_ME_DATA:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
      };

    case RESET_LOGOUT_DATA:
      localStorage.clear();
      return {
        ...state,
        _id: null,
        email: null,
        login: null,
        message: null,
      };
    default:
      return state;
  }
};

export default authReducer;
