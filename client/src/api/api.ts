import axios from "axios";
import { ICreateNewData, IGetEmployeesData, ILoginData, ILogoutData, IRegistrateData, IRemoveData } from "../types/IRequestT";


const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
});

export const employeeAPI = {
  
  async getEmployees({page, number}: IGetEmployeesData): Promise<any> {
    try {
      const res = await instance.get(`employee?page=${page}&number=${number}`);
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },
  async createNew(data: ICreateNewData) {
    try {
      const res = await instance.put(`employee/create`, data);
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },
  async editEmployee(data: ICreateNewData, id: string) {
    try {
      const res = await instance.patch(`employee/update?id=${id}`, data);
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },
  async removeEmployee({ number, page, id }: IRemoveData) {
    try {
      const res = await instance.delete(`employee/delete?id=${id}&page=${page}&number=${number}`);
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },
};

export const authAPI = {
  async registration(registrateData: IRegistrateData) {
    try {
      const res = await instance.post("auth/register", { ...registrateData });
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },

  async login(loginData: ILoginData) {
    try {
      const res = await instance.post("auth/login", { ...loginData });
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },

  logout(logoutData: ILogoutData) {
    return instance.post("auth/logout", { email: logoutData.email });
  },

  async me() {
    try {
      const res = await instance.get("me");
      return res.data;
    } catch (error: any) {
      return axios.isAxiosError(error) ? error.response?.data : error.response
    }
  },
};