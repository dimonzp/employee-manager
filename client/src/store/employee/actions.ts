import { ICreateNewData, IRemoveData, IGetEmployeesData } from './../../types/IRequestT';
import { IGetEmployeesRes } from './../../types/IResponseT';
import { IAction, IEmployee } from "../../types/IStoreT";
import { NavigateFunction } from 'react-router-dom';

export interface ILoadEmployeesA extends IAction<IGetEmployeesData> {}
export interface ICreateNewA extends IAction<{navigate: NavigateFunction, data: ICreateNewData}> {}
export interface IEditEmployeeA extends IAction<{ data: ICreateNewData, id: string}> {}
export interface IRemoveA extends IAction<IRemoveData> {}

export const SET_EMPLOYEES = "SET_EMPLOYEES";
export const LOAD_EMPLOYEES = "LOAD_EMPLOYEES";

export const CREATE_NEW_EMPLOYEE = "CREATE_NEW_EMPLOYEE";
export const REMOVE_EMPLOYEE = "REMOVE_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";

export const SET_REMOVED = "SET_REMOVED";
export const SET_EDIT_VISIBLE = "SET_EDIT_VISIBLE";
export const SET_UPDATED_EMPLOYEE = "SET_UPDATED_EMPLOYEE";

//for saga
export const loadEmployees = (payload: IGetEmployeesData) => ({ type: LOAD_EMPLOYEES, payload} as ILoadEmployeesA);
export const setEmployees = (payload: IGetEmployeesRes) => ({ type: SET_EMPLOYEES, payload});

export const createNewEmployee = (data: ICreateNewData, navigate: NavigateFunction) => ({ type: CREATE_NEW_EMPLOYEE, payload: { data, navigate } });
export const removeEmployee = (payload: IRemoveData) => ({ type: REMOVE_EMPLOYEE, payload });
export const editEmployee = (id: string, data: ICreateNewData) => ({ type: EDIT_EMPLOYEE, payload: { id, data }});

export const setRemoved = (id: string) => ({ type: SET_REMOVED, payload: { id } });
export const setEditVisible = (id: string, isVisible: boolean) => ({ type: SET_EDIT_VISIBLE, payload: { id, isVisible } });
export const setUpdatedEmployee = (employee: IEmployee) => ({ type: SET_UPDATED_EMPLOYEE, payload: employee });