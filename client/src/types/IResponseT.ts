import { IEmployee } from './IStoreT';
import { IRegistrateData } from "./IRequestT";

// Auth response
export interface IMeRes extends Omit<IRegistrateData, "password">{}
export interface ILoginRes extends IErorrRes {
    user: IMeRes
}

// Employees response
export interface IGetEmployeesRes {
    currentEmployees: IEmployee[];
    allEmployeesCount: number;
}

// Common
export interface IErorrRes {
    message: string
}