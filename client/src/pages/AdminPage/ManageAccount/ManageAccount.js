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
import MenuItem from "@material-ui/core/MenuItem";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//[Server/Backend] Show Information account
const axios = require("axios");
const ManageAccount = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [editUser, setEditUser] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState();
  const [anotherCenter, setAnotherCenter] = useState();
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
  //[Server/Backend] Create new a Account
  const showCreate = () => {
    if (createStatus === true)
      return <CreateAccountForm getAddData={(data) => getAddData(data)} />;
  };
 // [Server/Backend] Edit Account
  const showEdit = () => {
    if (editStatus === true)
      return (
        <EditAccountForm
          editUser={editUser}
          getEditUser={(data) => getEditUser(data)}
        />
      );
  };
// [Server/Backend] 
  const blockUser = (rowData) => {
    if (rowData.account_role === "DTU Event Center") {
      setSelectedCenter(rowData.account_username);
      setOpen(true);
    } else {
      if (window.confirm("Are you sure block this user ?"))
        if (
          rowData.account_username.toLowerCase() ===
          sessionStorage.getItem("account_username").toLowerCase()
        )
          NotificationManager.error(
            "You can't block your account",
            "Error",
            3000
          );
        else {
          axios
            .post("/block-user", {
              account_username: rowData.account_username.toLowerCase(),
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
    }
  };
  const blockCenter = () => {
    axios
      .post("/block-user", {
        account_username: selectedCenter.toLowerCase(),
        account_role: "DTU Event Center",
        account_username_another: anotherCenter.toLowerCase(),
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          setOpen(false);
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
        account_username: data.account_username
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .replace(/\s/g, "")
          .replace(/[^a-z0-9\s]/gi, "")
          .toLowerCase(),
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
  //[Server/Backend] Delete Account
  const deleteUser = (userID) => {
    if (
      userID.toLowerCase() ===
      sessionStorage.getItem("account_username").toLowerCase()
    )
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
  //[Server/Backend] Edit Account
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
  var centerAccount = dataUser.filter(
    (item) => item.account_role === "DTU Event Center"
  );
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
                  filtering: true,
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
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Warning !!! </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  If you want block this Event Center, you must give future
                  events of this Event Center to another
                </DialogContentText>
                <ValidatorForm
                  onSubmit={() => blockCenter()}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TextValidator
                    autoFocus
                    margin="dense"
                    select
                    value={anotherCenter}
                    label="Event Center *"
                    onChange={(e) => setAnotherCenter(e.target.value)}
                    fullWidth
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  >
                    {centerAccount
                      .filter(
                        (item) => item.account_username !== selectedCenter
                      )
                      .map((account) => {
                        return (
                          <MenuItem
                            key={account.account_username}
                            value={account.account_username}
                          >
                            {account.account_name}
                          </MenuItem>
                        );
                      })}
                  </TextValidator>
                  <div className="mt-2">
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary">
                      Cancel
                    </Button>
                  </div>
                </ValidatorForm>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Footer />
      </main>
      <NotificationContainer />
    </div>
  );
};
export default ManageAccount;
