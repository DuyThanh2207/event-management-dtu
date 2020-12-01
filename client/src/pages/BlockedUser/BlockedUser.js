import React from "react";
import { useHistory } from "react-router-dom";
function BlockedUser() {
  let history = useHistory();
  const onLogout = () => {
    history.push("/");
    sessionStorage.clear();
  };
  return (
    <div
      style={{
        backgroundColor: "#88d5e5",
        textAlign: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src="https://blocked.bark.us/blocked.svg"
        alt="blocked"
        style={{ maxWidth: "80%", maxHeight: "90%" }}
      />
      <br />
      <div className="btn btn-danger" onClick={() => onLogout()}>
        Click here to Log out
      </div>
    </div>
  );
}

export default BlockedUser;
