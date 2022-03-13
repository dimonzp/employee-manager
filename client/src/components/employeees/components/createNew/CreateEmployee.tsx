import { Form, Input, Button, Select } from "antd";
import { FC, useEffect } from "react";
import { IEmployee } from "../../../../types/IStoreT";
import { useDispatch } from "react-redux";
import {
  createNewEmployee,
  editEmployee,
} from "../../../../store/employee/actions";
import { ICreateNewData } from "../../../../types/IRequestT";
import { useNavigate } from "react-router-dom";
import "./create-employee.scss";

const { Option } = Select;

interface Props {
  employee?: IEmployee;
}

export const CreateEmployee: FC<Props> = ({ employee }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const contacts = [values.first_phone];
    values.second_phone && contacts.push(values.second_phone);
    const data: ICreateNewData = {
      contacts,
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
      },
      gender: values.gender,
      position: values.position,
      salary: values.salary,
    };
    dispatch(
      employee && employee._id
        ? editEmployee(employee?._id, data)
        : createNewEmployee(data, navigate)
    );
  };

  useEffect(() => {
    if (employee) {
      const {
        contacts,
        gender,
        name: { firstName, lastName, middleName },
        position,
        salary,
      } = employee;
      form.setFieldsValue({
        firstName,
        lastName,
        middleName,
        gender,
        first_phone: contacts[0],
        second_phone: contacts[1],
        position,
        salary,
      });
    }
  }, [employee, form]);

  return (
    <div className="create-new-box">
      <h1>{employee ? "Update" : "Create New"}</h1>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="middleName" label="Middle Name">
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="MALE">MALE</Option>
            <Option value="FEMALE">FEMALE</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="first_phone"
          label="First Phone"
          rules={[
            { required: true, message: "At least one contact is required" },
          ]}
        >
          <Input placeholder="number" />
        </Form.Item>
        <Form.Item name="second_phone" label="Second Phone">
          <Input placeholder="number" />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="salary" label="Salary" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {employee ? "Edit" : "Create New"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
