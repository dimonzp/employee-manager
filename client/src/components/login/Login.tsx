import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ILoginData } from "../../types/IRequestT";
import { useDispatch, useSelector } from "react-redux";
import { loadLogin, setMessage } from "../../store/auth/actions";
import { useErrorMessage } from "../../hooks/useErrorMessage";
import { IStore } from "../../types/IStoreT";
import "./login.scss"

interface Props {}

export const Login: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((store: IStore) => store.authPage.message )
  const getErrorMessage = useErrorMessage(errorMessage || "", "Unauthorized");

  const onFinish = (data: ILoginData) => {
    getErrorMessage();
    dispatch(loadLogin(data, navigate));
  };
  useEffect(() => {
    getErrorMessage();
    return () => {dispatch(setMessage(''))}
  }, [getErrorMessage, dispatch]);

  return (
    <div className="login">
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        validateTrigger="onBlur"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              max: 50,
              message: "Max length 50 symbols",
            },
            {
              type: "email",
              message: "Incorrect Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input min 6 symbols!",
              min: 6,
            },
            {
              max: 50,
              message: "Max length 50 symbols",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <span>Or</span>
          <Link to="/registrate">Registrate Now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

