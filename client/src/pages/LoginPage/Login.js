import React from 'react';
import { useHistory } from "react-router-dom";
const Login = () => {
    let history = useHistory();
    const onClickHandler = () => {
        history.push("/event")
    }
    return (<div className="btn btn-primary" onClick = {() => onClickHandler()}>Login</div>);
}

export default Login;