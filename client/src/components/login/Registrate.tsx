import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useErrorMessage } from "../../hooks/useErrorMessage";
import { IRegistrateData } from "../../types/IRequestT";
import { useDispatch, useSelector } from "react-redux";
import { loadRegisrate, setMessage } from "../../store/auth/actions";
import { IStore } from "../../types/IStoreT";
import "./login.scss"

interface Props {}

export const Registrate: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const errorMessage = useSelector((store: IStore) => store.authPage.message )
  const getErrorMessage = useErrorMessage(errorMessage || "", "No such user")

  const onFinish = (data: IRegistrateData) => {
    getErrorMessage()
    dispatch(loadRegisrate(data, navigate))
  };
  useEffect(() => {
    getErrorMessage();
    return () => {dispatch(setMessage(''))}
  }, [getErrorMessage, dispatch]);

  return <div className="registrate">
    <h1>Registrate</h1>
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      validateTrigger="onBlur"
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            pattern: new RegExp(
              /[^а-яА-ЯёЁ\s]$/
            ),
            message: "Don`t use Cyrillic symbols or spaces"
          },
          {
            min: 6,
            message: "Less than 6 symbols",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,

            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The second passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="login"
        label={
          <span>
            Login&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your login!",
            whitespace: true,
          },
          {
            min: 5,
            message: "Les than 5 simbols",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrate
        </Button>
        <span>Or</span>
        <Link to="/login">Have an account?</Link>
      </Form.Item>
    </Form>
  </div>
};