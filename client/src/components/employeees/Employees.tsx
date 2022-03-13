import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Modal, Pagination, Popover } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IStore } from "../../types/IStoreT";
import {
  loadEmployees,
  removeEmployee,
  setEditVisible,
  setRemoved,
} from "../../store/employee/actions";
import Meta from "antd/lib/card/Meta";
import { getDate } from "../../utils/getDate";
import { CreateEmployee } from "./components/createNew/CreateEmployee";
import "./employee.scss";

interface Props {}

export const Employees: FC<Props> = () => {
  const [page, setPage] = useState<number>(1);
  const employeesNumber = useRef(5);
  const { allEmployeesCount, employees } = useSelector(
    (store: IStore) => store.employeePage
  );
  const dispatch = useDispatch();

  const onPageChange = (page: number) => {
    setPage(page);
    dispatch(loadEmployees({ number: employeesNumber.current, page }));
  };
  const onDeleteHandler = (id: string) => {
    dispatch(setRemoved(id));
    dispatch(removeEmployee({ id, number: employeesNumber.current, page }));
  };
  const showEditModal = (id: string, isVisible: boolean) => () => {
    dispatch(setEditVisible(id, isVisible));
  };
  useEffect(() => {
    dispatch(loadEmployees({ number: employeesNumber.current, page: 1 }));
  }, [dispatch]);

  return (
    <div className="employees-box">
      {Object.values(employees).map((employee) => (
        <Card
          className={employee.removed ? "removed" : ""}
          key={employee._id}
          actions={[
            <EditOutlined onClick={showEditModal(employee._id, true)} />,
            <Modal
              visible={employee.isEditVisible}
              footer={false}
              onCancel={showEditModal(employee._id, false)}
            >
              <CreateEmployee employee={employee} />
            </Modal>,
            <Popover
              content={
                <div>
                  <Button
                    onClick={() => onDeleteHandler(employee._id)}
                    type="primary"
                    danger
                    size="small"
                  >
                    Delete
                    <DeleteOutlined />
                  </Button>
                </div>
              }
              title="Delete employee?"
              trigger="click"
            >
              <Button danger size="small">
                <DeleteOutlined />
              </Button>
            </Popover>,
          ]}
        >
          <Meta
            title={`${employee.name.lastName} ${employee.name.firstName} ${
              employee.name.middleName ? employee.name.middleName : ""
            }`}
            description={
              <div>
                <span>Contacts:</span>{" "}
                {employee.contacts.map((num, id) => (
                  <span key={id}> {num}</span>
                ))}
                <br />
                <span>Gender:</span> {employee.gender}
                <br />
                <span>Position:</span> {employee.position}
                <br />
                <span>Salary:</span> {employee.salary}
                <br />
                <span>Last update:</span> {getDate(new Date(employee.updated))}
              </div>
            }
          />
        </Card>
      ))}

      <Pagination
        current={page}
        onChange={onPageChange}
        total={allEmployeesCount}
        pageSize={employeesNumber.current}
      />
    </div>
  );
};
