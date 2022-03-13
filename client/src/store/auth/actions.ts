import { IMeRes } from "./../../types/IResponseT";
import { NavigateFunction } from "react-router-dom";
import { ILoginData, IRegistrateData } from "../../types/IRequestT";
import { IAction } from "../../types/IStoreT";

export interface ILoadLoginA
  extends IAction<{ navigate: NavigateFunction; loginData: ILoginData }> {}
export interface ILoadRegistrateA
  extends IAction<{
    navigate: NavigateFunction;
    registrateData: IRegistrateData;
  }> {}
export interface ILoadLogoutA
  extends IAction<{ navigate: NavigateFunction; email: string }> {}

//For registration
export const LOAD_AUTH = "LOAD_AUTH";
export const SET_MESSAGE = "LOAD_MESSAGE";

//For login
export const LOAD_LOGIN = "LOAD_LOGIN";

//For checkMe login
export const LOAD_ME = "LOAD_ME";
export const SET_LOAD_ME_DATA = "SET_LOAD_ME_DATA";

//for logout
export const LOAD_LOGOUT = "LOAD_LOGOUT";
export const RESET_LOGOUT_DATA = "RESET_LOGOUT_DATA";

//action for watcher
export const loadRegisrate = (
  registrateData: IRegistrateData,
  navigate: NavigateFunction
) =>
  ({
    type: LOAD_AUTH,
    payload: { registrateData, navigate },
  } as ILoadRegistrateA);
export const loadLogin = (loginData: ILoginData, navigate: NavigateFunction) =>
  ({ type: LOAD_LOGIN, payload: { loginData, navigate } } as ILoadLoginA);
export const loadLogout = (email: string, navigate: NavigateFunction) =>
  ({ type: LOAD_LOGOUT, payload: { email, navigate } } as ILoadLogoutA);
export const loadMe = (navigate: NavigateFunction) => ({
  type: LOAD_ME,
  payload: { navigate },
});

//action
export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: { message },
});

export const setLoadMeData = (payload: IMeRes) => ({
  type: SET_LOAD_ME_DATA,
  payload,
});

export const resetLogoutData = () => ({
  type: RESET_LOGOUT_DATA,
});
