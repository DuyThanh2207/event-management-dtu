import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "./../../components/Footer";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import LockIcon from "@material-ui/icons/Lock";
const axios = require("axios");
//[Server/Backend] Login for admin, Event organizer, Event center.
const Login = () => {
  const [isFail, setIsFail] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();
  const onClickHandler = () => {
    axios
      .post("/login", {
        account_username: userName,
        account_password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setIsFail(true);
        } else {
          setIsFail(false);
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("account_name", res.data[0].account_name);
          sessionStorage.setItem(
            "account_username",
            res.data[0].account_username
          );
          sessionStorage.setItem("account_email", res.data[0].account_email);
          sessionStorage.setItem("account_role", res.data[0].account_role);
          if (sessionStorage.getItem("account_role") === "Admin") {
            history.push("/event");
          } else if (
            sessionStorage.getItem("account_role") === "DTU Event Center"
          ) {
            history.push("/event");
          } else if (
            sessionStorage.getItem("account_role") === "DTU Event Staff" ||
            sessionStorage.getItem("account_role") === "Sub Center"
          ) {
            history.push("/event");
          } else if (sessionStorage.getItem("account_role") === "Blocked") {
            history.push("/event");
          }
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onForgot = () => {
    history.push("/forgot-password");
  };
  return (
    <div style={{ backgroundColor: "#fbe2e5", height: "100%" }}>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div
              className="d-flex justify-content-center mb-5"
              style={{ marginTop: "120px" }}
            >
              <img
                src="https://pbs.twimg.com/profile_images/1211688669/logoDT-png_400x400.png"
                alt="logo"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <h1 style={{ color: "#a3312e" }}>Event Management DTU</h1>
            </div>
          </div>
          <div className="col-4" style={{ marginTop: "80px" }}>
            <div className="card mr-5 mt-5">
              <div className="card-header ">
                <h3>Sign in</h3>
              </div>
              <div className="card-body ml-3 mr-3">
                <MDBContainer>
                  <MDBRow>
                    <MDBCol>
                      <form>
                        <div className="grey-text">
                          <MDBInput
                            label="Type your username"
                            icon="envelope"
                            group
                            type="text"
                            validate
                            name="userName"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                          <MDBInput
                            label="Type your password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div
                          className="text-center"
                          onClick={() => onClickHandler()}
                        >
                          <MDBBtn>Login</MDBBtn>
                        </div>
                      </form>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
                {isFail ? (
                  <p
                    className="mt-3 d-flex justify-content-center"
                    style={{ color: "red" }}
                  >
                    {" "}
                    Wrong Username / Password{" "}
                  </p>
                ) : null}
                <div className="d-flex justify-content-center">
                  <button
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      padding: 0,
                      border: "none",
                      background: "none",
                    }}
                    className="d-flex"
                    onClick={() => onForgot()}
                  >
                    <LockIcon />
                    <div
                      style={{
                        marginTop: "0px",
                        marginLeft: "5px",
                      }}
                    >
                      Forgot your password ?
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
