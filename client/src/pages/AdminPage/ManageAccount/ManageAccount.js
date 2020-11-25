import React, { useEffect, useState } from "react";
import CreateAccountForm from "../../../components/AdminPage/ManageAccount/CreateAccountForm";
import "react-confirm-alert/src/react-confirm-alert.css";
import Header from "./../../../components/Header";
import Footer from "./../../../components/Footer";
import Navbar from "./../../../components/AdminPage/Navbar";
import MaterialTable from "material-table";
import "react-notifications/lib/notifications.css";
import EditIcon from "@material-ui/icons/Edit";
import EditAccountForm from "./../../../components/AdminPage/ManageAccount/EditAccountFrom";
import BlockIcon from "@material-ui/icons/Block";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
const axios = require("axios");
const ManageAccount = () => {
  const [show, setShow] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [editUser, setEditUser] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Account", field: "account_username" },
    { title: "Name", field: "account_name" },
    { title: "Email", field: "account_email" },
    { title: "Color", field: "account_color" },
    {
      title: "Role",
      field: "account_role",
      lookup: {
        "DTU Event Center": "DTU Event Center",
        "DTU Event Staff": "DTU Event Staff",
        Admin: "Admin",
        Blocked: "Blocked",
      },
    },
    {
      title: "Edit / Block",
      render: (rowData) => (
        <>
          <div
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
            onClick={() => changeEditStatus(rowData)}
          >
            <EditIcon />
          </div>
          <div
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit ml-1"
            onClick={() => blockUser(rowData)}
          >
            <BlockIcon />
          </div>
        </>
      ),
    },
  ]);
  const fetchData = () => {
    axios
      .get("/account")
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const showCreate = () => {
    if (createStatus === true)
      return <CreateAccountForm getAddData={(data) => getAddData(data)} />;
  };
  const showEdit = () => {
    if (editStatus === true)
      return (
        <EditAccountForm
          editUser={editUser}
          getEditUser={(data) => getEditUser(data)}
        />
      );
  };
  const blockUser = (rowData) => {
    if (window.confirm("Are you sure block this user ?"))
      axios
        .post("/block-user", {
          account_username: rowData.account_username.toLowerCase(),
        })
        .then((res) => {
          if (res.data.message) {
            NotificationManager.error(res.data.message, "Error", 3000);
          } else {
            NotificationManager.success("Complete !", "Success", 3000);
            setCreateStatus(false);
            fetchData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const getAddData = (data) => {
    axios
      .post("/create-user", {
        account_name: data.account_name,
        account_username: data.account_username.toLowerCase(),
        account_password: data.account_password,
        account_email: data.account_email,
        account_role: data.account_role,
        account_color: data.account_color,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          setCreateStatus(false);
          setShow(false);
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeCreateStatus = () => {
    setEditStatus(false);
    setCreateStatus(true);
    setShow(true);
  };
  const changeEditStatus = (rowData) => {
    setEditUser(rowData);
    setCreateStatus(false);
    setEditStatus(true);
    setShow(true);
  };
  const deleteUser = (userID) => {
    if (userID === sessionStorage.getItem("account_username"))
      NotificationManager.error("You can't delete your account", "Error", 3000);
    else {
      axios
        .post("/delete-user", {
          account_username: userID,
        })
        .then((res) => {
          if (res.data.message) {
            NotificationManager.error(res.data.message, "Error", 3000);
          } else {
            NotificationManager.success("Complete !", "Success", 3000);
            fetchData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getEditUser = (user) => {
    axios
      .post("/edit-user", {
        account_name: user.account_name,
        account_password: user.account_password,
        account_username: user.account_username.toLowerCase(),
        account_email: user.account_email,
        account_role: user.account_role,
        account_color: user.account_color,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          setEditStatus(false);
          setShow(false);
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container">
          <div className="container">
            <div className="btn-group mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => changeCreateStatus()}
              >
                Create Account
              </button>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col">
              <MaterialTable
                title="Account"
                columns={columns}
                data={dataUser}
                options={{
                  actionsColumnIndex: -1,
                }}
                editable={{
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        const dataDelete = [...dataUser];
                        const index = oldData.tableData.id;
                        deleteUser(dataDelete[index].account_username);
                        resolve();
                      }, 1000);
                    }),
                }}
              />
            </div>
            <Modal show={show} onHide={() => setShow(false)} centered>
              <Modal.Body>
                <div className="d-flex justify-content-center mt-2">
                  {showCreate()}
                  {showEdit()}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <Footer />
      </main>
      <NotificationContainer />
    </div>
  );
};
export default ManageAccount;
