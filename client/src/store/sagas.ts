import { employeeAPI } from "./../api/api";
import {
  IErorrRes,
  IMeRes,
  ILoginRes,
  IGetEmployeesRes,
} from "./../types/IResponseT";
import { takeEvery, put, call, all } from "redux-saga/effects";
import { authAPI } from "../api/api";
import {
  ILoadLoginA,
  ILoadLogoutA,
  ILoadRegistrateA,
  LOAD_AUTH,
  LOAD_LOGIN,
  LOAD_LOGOUT,
  LOAD_ME,
  resetLogoutData,
  setLoadMeData,
  setMessage,
} from "./auth/actions";
import {
  CREATE_NEW_EMPLOYEE,
  EDIT_EMPLOYEE,
  ICreateNewA,
  IEditEmployeeA,
  ILoadEmployeesA,
  IRemoveA,
  LOAD_EMPLOYEES,
  REMOVE_EMPLOYEE,
  setEditVisible,
  setEmployees,
  setUpdatedEmployee,
} from "./employee/actions";
import { IEmployee } from "../types/IStoreT";

//Loading array of employees
function* workerLoadEmployees(action: ILoadEmployeesA) {
  const employees: IGetEmployeesRes | IErorrRes = yield call(
    employeeAPI.getEmployees,
    {
      page: action.payload.page,
      number: action.payload.number,
    }
  );

  if ("currentEmployees" in employees) {
    yield put(setEmployees(employees));
  }
}

export function* watchLoadEmployees() {
  yield takeEvery(LOAD_EMPLOYEES, workerLoadEmployees);
}

//Create new employee
function* workerCreateNewEmloyee(action: ICreateNewA) {
  const data: IEmployee | IErorrRes = yield call(
    employeeAPI.createNew,
    action.payload.data
  );
  if ("name" in data) {
    action.payload.navigate("/employees");
  }
}

export function* watchCreateNewEmployee() {
  yield takeEvery(CREATE_NEW_EMPLOYEE, workerCreateNewEmloyee);
}

//Edit employee
function* workerEditEmloyee(action: IEditEmployeeA) {
  const employee: IEmployee | IErorrRes = yield call(
    employeeAPI.editEmployee,
    action.payload.data,
    action.payload.id
  );
  if ("name" in employee) {
    yield put(setUpdatedEmployee(employee));
    yield put(setEditVisible(employee._id, false));
  }
}

export function* watchEditEmployee() {
  yield takeEvery(EDIT_EMPLOYEE, workerEditEmloyee);
}

//Remove employee
function* workerRemoveEmloyee(action: IRemoveA) {
  const employees: IGetEmployeesRes | IErorrRes = yield call(
    employeeAPI.removeEmployee,
    action.payload
  );
  if ("currentEmployees" in employees) {
    yield put(setEmployees(employees));
  }
}

export function* watchRemoveEmployee() {
  yield takeEvery(REMOVE_EMPLOYEE, workerRemoveEmloyee);
}

//Registration
function* workerRegistration(action: ILoadRegistrateA) {
  const data: ILoginRes | IErorrRes = yield call(
    authAPI.registration,
    action.payload.registrateData
  );
  if ("user" in data) {
    yield put(setLoadMeData(data.user));
    action.payload.navigate("/employees");
  } else {
    yield put(setMessage(data.message));
  }
}

export function* watchRegistration() {
  yield takeEvery(LOAD_AUTH, workerRegistration);
}

//Login
function* workerLogin(action: ILoadLoginA) {
  const data: ILoginRes | IErorrRes = yield call(
    authAPI.login,
    action.payload.loginData
  );

  if ("user" in data) {
    yield put(setLoadMeData(data.user));
    action.payload.navigate("/employees");
  } else {
    yield put(setMessage(data.message));
  }
}

export function* watchLogin() {
  yield takeEvery(LOAD_LOGIN, workerLogin);
}

//Logout
function* workerLogout(action: ILoadLogoutA) {
  yield call(authAPI.logout, { email: action.payload.email });
  yield put(resetLogoutData());
}

export function* watchLogout() {
  yield takeEvery(LOAD_LOGOUT, workerLogout);
}

//Check me login
function* workerMe() {
  const auth = localStorage.getItem("user");
  let data: IMeRes = auth ? JSON.parse(auth) : yield call(authAPI.me);
  if (data?.email) {
    yield put(setLoadMeData(data));
  }
}
export function* watchMe() {
  yield takeEvery(LOAD_ME, workerMe);
}

export default function* rootSaga() {
  yield all([
    watchMe(),
    watchLogin(),
    watchRegistration(),
    watchLogout(),
    watchLoadEmployees(),
    watchCreateNewEmployee(),
    watchRemoveEmployee(),
    watchEditEmployee(),
  ]);
}
