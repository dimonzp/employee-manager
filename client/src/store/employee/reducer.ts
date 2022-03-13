import { IEmployee, IEmployeesState } from "./../../types/IStoreT";
import { IAction } from "../../types/IStoreT";
import {
  SET_EDIT_VISIBLE,
  SET_EMPLOYEES,
  SET_REMOVED,
  SET_UPDATED_EMPLOYEE,
} from "./actions";
import { IGetEmployeesRes } from "../../types/IResponseT";

const initialState: IEmployeesState = {
  employees: {},
  allEmployeesCount: 0,
};

const employeesReducer = (
  state = initialState,
  action: IAction<
    | IGetEmployeesRes
    | IEmployee
    | { id: string }
    | { id: string; isVisible: boolean }
  >
) => {
  switch (action.type) {
    case SET_EMPLOYEES: {
      if ("currentEmployees" in action.payload) {
        let employees: { [key: string]: IEmployee } = {};
        action.payload.currentEmployees.forEach((element) => {
          employees[element._id] = element;
        });
        return {
          ...state,
          employees,
          allEmployeesCount: action.payload.allEmployeesCount,
        };
      }
      return state;
    }
    case SET_REMOVED: {
      if ("id" in action.payload) {
        state.employees[action.payload.id].removed = true;
      }
      return { ...state };
    }
    case SET_UPDATED_EMPLOYEE: {
      if ("name" in action.payload) {
        state.employees[action.payload._id] = { ...action.payload };
      }
      return { ...state };
    }
    case SET_EDIT_VISIBLE: {
      if ("isVisible" in action.payload) {
        state.employees[action.payload.id].isEditVisible =
          action.payload.isVisible;
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export default employeesReducer;
