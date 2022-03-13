import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DingtalkOutlined } from "@ant-design/icons";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadLogout } from "../../store/auth/actions";
import { IStore } from "../../types/IStoreT";
import { Button } from "antd";
import {UsergroupAddOutlined} from '@ant-design/icons';

interface Props {}

export const Header: FC<Props> = () => {
  const { email, login } = useSelector((store: IStore) => store.authPage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutHandle = () => {
    dispatch(loadLogout(email, navigate));
  };
  return (
    <header>
      <DingtalkOutlined onClick={() => navigate(login ? "/employees" : "/")} />
      {login ? (
          <>
          <Button><Link to="/new"><UsergroupAddOutlined /> Add new</Link></Button>
            <div className="header-login">
            <span>{login} </span>
            <Link to="/" onClick={onLogoutHandle}>
                Logout
            </Link>
            </div>
          </>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <span> / </span>
          <Link to="/registrate">Registrate</Link>
        </nav>
      )}
    </header>
  );
};
