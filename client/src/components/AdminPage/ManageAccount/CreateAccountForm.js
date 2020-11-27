import React, { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { SliderPicker } from "react-color";
const CreateAccountForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [color, setColor] = useState("");
  const getCreateAccount = () => {
    let data = {
      account_username: username,
      account_password: password,
      account_name: name,
      account_email: email,
      account_role: role,
      account_color: color,
    };
    props.getAddData(data);
  };
  return (
    <div style={{ width: "90%" }}>
      <ValidatorForm
        onSubmit={getCreateAccount}
        style={{ width: "100%", height: "100%" }}
      >
        <TextValidator
          style={{ width: "100%" }}
          label="Username *"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          validators={["required"]}
          type="text"
          errorMessages={["This field is required"]}
        />
        <br />
        <TextValidator
          style={{ width: "100%" }}
          label="Password *"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          validators={["required"]}
          errorMessages={["This field is required"]}
        />
        <br />
        <TextValidator
          style={{ width: "100%" }}
          label="Name *"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          validators={["required"]}
          errorMessages={["This field is required"]}
        />
        <br />
        <TextValidator
          style={{ width: "100%" }}
          label="Email *"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          validators={["required"]}
          errorMessages={["This field is required"]}
        />
        <br />
        <TextValidator
          style={{ width: "100%" }}
          label="Role *"
          select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          helperText="Please select role"
          validators={["required"]}
          errorMessages={["This field is required"]}
        >
          <MenuItem key="DTU Event Center" value="DTU Event Center">
            DTU Event Center
          </MenuItem>
          <MenuItem key="DTU Event Staff" value="DTU Event Staff">
            DTU Event Staff
          </MenuItem>
          <MenuItem key="Admin" value="Admin">
            Admin
          </MenuItem>
        </TextValidator>
        <br />
        {role === "DTU Event Center" && (
          <div>
            <SliderPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
            <br />
          </div>
        )}
        <h5 className="mb-3" style={{ color: "red" }}>
          * is require
        </h5>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </ValidatorForm>
    </div>
  );
};
export default CreateAccountForm;
