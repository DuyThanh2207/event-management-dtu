import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Header from "../../../components/Header";
import Footer from "./../../../components/Footer";
import Navbar from "./../../../components/AdminPage/Navbar";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");
function DetailsAccountAdmin() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [edit, setEdit] = useState(true);
  const handleSubmit = () => {
    axios
      .post("/edit-account-details", {
        account_username: sessionStorage.getItem("account_username"),
        account_name: name,
        account_email: email,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          setEdit(true);
          fetchAccountData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchAccountData = async () => {
    const data = await axios
      .post("/account-details", {
        account_username: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data);
          setEmail(res.data[0].account_email);
          setName(res.data[0].account_name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAccountData();
  }, []);
  //[Frontend] account detail information
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card" style={{ width: "50%" }}>
            <div className="d-flex justify-content-between">
              <div></div>
              <h2 className="mt-3">Account Details</h2>
              <div className="btn btn-warning" onClick={() => setEdit(false)}>
                Edit
              </div>
            </div>
            <hr />
            <div className="card-body d-flex justify-content-center">
              <ValidatorForm onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div className="row">
                  <div className="col-2 mt-2">
                    <div className="d-flex">
                      Name
                      <div className="ml-1" style={{ color: "red" }}>
                        *
                      </div>
                    </div>
                    <br />
                    <div className="d-flex mt-2">
                      Email
                      <div className="ml-1" style={{ color: "red" }}>
                        *
                      </div>
                    </div>
                  </div>
                  <div className="col-10">
                    {edit ? (
                      <div>
                        <TextValidator
                          disabled
                          style={{ width: "100%" }}
                          value={name}
                        />
                        <br />
                        <TextValidator
                          disabled
                          style={{ width: "100%" }}
                          value={email}
                        />
                      </div>
                    ) : (
                      <div>
                        <TextValidator
                          style={{ width: "100%" }}
                          onChange={(event) => setName(event.target.value)}
                          value={name}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                        />
                        <br />
                        <TextValidator
                          style={{ width: "100%" }}
                          onChange={(event) => setEmail(event.target.value)}
                          value={email}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                        />
                        <br />
                        <h5 className="mb-3" style={{ color: "red" }}>
                          * is require
                        </h5>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button
                          className="ml-3"
                          variant="contained"
                          onClick={() => setEdit(true)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <NotificationContainer />
    </div>
  );
}

export default DetailsAccountAdmin;
