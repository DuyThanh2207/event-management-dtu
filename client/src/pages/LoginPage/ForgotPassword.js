import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "./../../components/Footer";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import emailjs from "emailjs-com";
const axios = require("axios");
const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  let history = useHistory();
  const onClickHandler = (e) => {
    e.preventDefault();
    e.persist();
    axios
      .post("/check-email", {
        account_email: email,
      })
      .then((res) => {
        if (res.data.length < 1) {
          setIsSuccess(false);
        } else {
          axios
            .post("/update-password", {
              account_email: email,
              account_password: newPassword,
            })
            .then((res) => {
              setShow(true);
              emailjs
                .sendForm(
                  "service_5zltoi9",
                  "template_bjuj75k",
                  e.target,
                  "user_Zf90p4fOpf7A0bQd1U25I"
                )
                .then(
                  (result) => {
                    setIsSuccess(true);
                    console.log(result.text);
                  },
                  (error) => {
                    console.log(error.text);
                  }
                );
            });
        }
      });
  };
  var newPassword =
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5);
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
                <h3>Recovery Password</h3>
              </div>
              <div className="card-body ml-3 mr-3">
                <form className="contact-form" onSubmit={onClickHandler}>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol>
                        {show === false ? (
                          <form>
                            <div className="grey-text">
                              <MDBInput
                                label="Type your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <input
                              type="hidden"
                              id="new_password"
                              name="new_password"
                              value={newPassword}
                            ></input>

                            <div className="text-center">
                              <MDBBtn type="submit">Submit</MDBBtn>
                              <div
                                className="btn btn-warning"
                                onClick={() => history.push("/")}
                              >
                                Back to Login
                              </div>
                            </div>
                          </form>
                        ) : (
                          <div>
                            <div className="d-flex justify-content-center mb-3">
                              We have sent you an email, please check you email
                              !
                            </div>
                            <div
                              className="btn btn-warning d-flex justify-content-center"
                              onClick={() => history.push("/")}
                            >
                              Back to Login
                            </div>
                          </div>
                        )}
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </form>
                {isSuccess === false ? (
                  <p
                    className="mt-2 d-flex justify-content-center"
                    style={{ color: "red" }}
                  >
                    {" "}
                    Wrong Email ! Please try again{" "}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
