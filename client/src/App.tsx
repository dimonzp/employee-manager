import React, { useEffect } from "react";
import { MainPage } from "./components/mainPage/MainPage";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Login } from "./components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadMe } from "./store/auth/actions";
import { Registrate } from "./components/login/Registrate";
import { Employees } from "./components/employeees/Employees";
import { CreateEmployee } from "./components/employeees/components/createNew/CreateEmployee";
import "./App.scss";
import { Button, Result } from "antd";
import { IStore } from "./types/IStoreT";

const App = () => {
  const login = useSelector((store: IStore) => store.authPage.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadMe(navigate));
  }, [dispatch, navigate]);
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={login ? <Navigate replace to="/employees" /> : <MainPage />} />
          <Route path="/login" element={login ? <Navigate replace to="/employees" /> : <Login />} />
          <Route path="/registrate" element={login ? <Navigate replace to="/employees" /> : <Registrate />} />
          <Route path="/employees" element={!login ? <Navigate replace to="/login" /> :<Employees />} />
          <Route path="/new" element={!login ? <Navigate replace to="/employees" /> : <CreateEmployee />} />
          <Route
            path="*"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
              />
            }
          />
        </Routes>
      </main>
      <footer>Developed by dimon.messages@gmail.com</footer>
    </div>
  );
};

export default App;
