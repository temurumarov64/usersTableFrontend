import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
  UserDeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteUserApi, getUsersApi, updateUserStatus } from "../api/users";
import { timeConverter, statusConverter } from "../utils";

function Users(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const logout = () => {
    navigate("/login");
  };

  const changeStatus = (status) => {
    setActionLoading(true);
    Promise.all(
      selectedRows.map((item) => {
        return updateUserStatus(item.id, status);
      })
    )
      .then((res) => {
        if (status === 0) {
          if (selectedRows.length === users.length) {
            logout();
            setSelectedRows([]);
            return;
          }
        }
        setSelectedRows([]);
        getUsers();
      })
      .catch(() => {
        setActionLoading(false);
      });
  };

  const getUsers = () => {
    setTableLoading(true);
    try {
      getUsersApi()
        .then((res) => {
          let usersData = [];
          res.data.forEach((item) => {
            usersData.push({
              key: item.id,
              ...item,
            });
          });
          setUsers(usersData);
          setActionLoading(false);
          setTableLoading(false);
        })
        .catch((err) => {
          setTableLoading(false);
          setActionLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = () => {
    setActionLoading(true);
    Promise.all(
      selectedRows.map((item) => {
        return deleteUserApi(item.id);
      })
    )
      .then((res) => {
        if (selectedRows.find((item) => item.id === userMe.id)) {
          logout();
          setSelectedRows([]);
          return;
        }
        setSelectedRows([]);
        getUsers();
      })
      .catch(() => {
        setActionLoading(false);
      });
  };

  const [userMe] = useState({});
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Registration time",
      dataIndex: "registr_date",
      render: (time) => timeConverter(time),
    },
    {
      title: "Last login",
      dataIndex: "last_seen_date",
      render: (time) => timeConverter(time),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => statusConverter(status),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-center pt-5">
        <h4>One more step towards my goals</h4>
      </div>
      <div className="p-5">
        <div className="p-2">
          <div className="mt-2 mb-3 d-flex justify-content-end">
            <Button
              disabled={selectedRows < 1}
              loading={actionLoading}
              onClick={() => changeStatus(0)}
              size={"small"}
              type="default"
              shape="round"
              icon={<CloseOutlined />}
              className="d-flex align-items-center"
            >
              block
            </Button>
            <Button
              disabled={selectedRows < 1}
              loading={actionLoading}
              onClick={() => changeStatus(1)}
              size={"small"}
              type="default"
              shape="round"
              className="mx-3 d-flex align-items-center"
            >
              <CheckOutlined /> unblock
            </Button>
            <Button
              disabled={selectedRows < 1}
              loading={actionLoading}
              onClick={() => deleteUser()}
              size={"small"}
              type="default"
              shape="round"
              className="d-flex align-items-center"
            >
              <UserDeleteOutlined />
              delete
            </Button>
          </div>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            loading={tableLoading}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
              selectedRowKeys: selectedRows.map((item) => item.key),
            }}
            columns={columns}
            dataSource={users}
            pagination={false}
          />
          <div className="mt-2 mb-3 d-flex justify-content-end">
            <Button
              onClick={() => logout()}
              size={"middle"}
              shape="round"
              type="text"
              className=" d-flex align-items-center"
            >
              <RocketOutlined />
              logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
