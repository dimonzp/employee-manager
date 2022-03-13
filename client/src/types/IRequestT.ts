import { IEmployee } from "./IStoreT";

// Auth types
export interface ILogoutData {
  email: string;
}
export interface ILoginData extends ILogoutData {
  password: string;
}
export interface IRegistrateData extends ILoginData {
  login: string;
}

// Employees types
export interface IGetEmployeesData {
  number: number;
  page: number;
}

export interface ICreateNewData extends Omit<Omit<IEmployee, "updated">, "_id"> {}
export interface IRemoveData extends IGetEmployeesData {
  id: string;
}
//
