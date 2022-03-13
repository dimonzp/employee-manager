import React, { FC } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./main-page.scss";

interface Props {}

export const MainPage: FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className="main-page">
      <h1>Manage your employees</h1>
      <p>
        This app can help you to manage your employees.
        <br />
        Join us
      </p>
      <Button size="large" onClick={() => navigate("/login")} type="primary">
        LOGIN
      </Button>
      <span>Don`t have an account?</span>
      <Link to="registrate">Quick registration</Link>
    </div>
  );
};
