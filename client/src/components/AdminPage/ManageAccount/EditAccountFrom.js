import React, { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { SliderPicker } from "react-color";
const EditAccountForm = (props) => {
  const [username, setUsername] = useState(props.editUser.account_username);
  const [password, setPassword] = useState(props.editUser.account_password);
  const [email, setEmail] = useState(props.editUser.account_email);
  const [name, setName] = useState(props.editUser.account_name);
  const [role, setRole] = useState(props.editUser.account_role);
  const [color, setColor] = useState(
    props.editUser.account_color === null ? " " : props.editUser.account_color
  );
  const getEditAccount = () => {
    let data = {
      account_username: username,
      account_password: password,
      account_name: name,
      account_email: email,
      account_role: role,
      account_color: color,
    };
    props.getEditUser(data);
  };
  return (
    <div style={{ width: "90%" }}>
      <ValidatorForm
        onSubmit={getEditAccount}
        style={{ width: "100%", height: "100%" }}
      >
        <TextValidator
          disabled
          style={{ width: "100%" }}
          label="Username *"
          value={username}
          type="text"
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
export default EditAccountForm;
