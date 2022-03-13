export interface IStore {
  authPage: IAuthState;
  employeePage: IEmployeesState
}

export interface IAuthState {
  _id: string;
  email: string;
  login: string;
  message?: string;
}

export interface IEmployeesState {
  employees: { [key: string]: IEmployee };
  allEmployeesCount: number;
}

export interface IEmployee {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
  gender: "MALE" | "FEMALE";
  salary: number;
  position: string;
  contacts: string[];
  updated: string;
  removed?: boolean; //use on FF side
  isEditVisible?: boolean; //use on FF side
}

export interface IAction<T> {
  type: string;
  payload: T;
}
