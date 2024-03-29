import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "./../../../components/Footer";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import Navbar from "./../../../components/StaffPage/Navbar";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  let history = useHistory();
  const getEditAccount = () => {
    if (oldPassword === newPassword) {
      NotificationManager.error(
        "New password is can't same with old password",
        "Error",
        3000
      );
    } else {
      axios
        .post("/change-password", {
          new_password: newPassword,
          old_password: oldPassword,
          account_username: sessionStorage.getItem("account_username"),
        })
        .then((res) => {
          if (res.data.message) {
            NotificationManager.error(res.data.message, "Error", 3000);
          } else {
            NotificationManager.success("Complete !", "Success", 3000);
            setTimeout(() => {
              history.push("/event");
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card" style={{ width: "50%" }}>
            <div className="card-body d-flex justify-content-center">
              <ValidatorForm
                onSubmit={getEditAccount}
                style={{ width: "100%" }}
              >
                <div className="d-flex justify-content-center">
                  <h2 className="mt-3">Change Password</h2>
                </div>
                <TextValidator
                  style={{ width: "100%" }}
                  label="Old Password"
                  onChange={(event) => setOldPassword(event.target.value)}
                  value={oldPassword}
                  validators={["required"]}
                  type="password"
                  errorMessages={["This field is required"]}
                />
                <br />
                <TextValidator
                  style={{ width: "100%" }}
                  label="New Password"
                  onChange={(event) => setNewPassword(event.target.value)}
                  value={newPassword}
                  type="password"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                />
                <br />
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </ValidatorForm>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <NotificationContainer />
    </div>
  );
};

export default ChangePassword;
