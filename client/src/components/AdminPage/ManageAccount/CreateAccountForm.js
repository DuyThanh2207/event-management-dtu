import React, { Component } from 'react';

class CreateAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            username: "",
            password: "",
            email: "",
            role: "",
        }
    }
    
    onHandleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }
    getCreateAccount = () => {
        this.props.getAddData(this.state)
        this.props.changeCreateStatus()
    }
    render() {
        return (
            <div className="card col-3" style={{width: '100%'}}>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputIDUser">ID User</label>
                            <input type="text" className="form-control" id="inputIDUser" name = "id" onChange = {(e) => this.onHandleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" id="inputName" name="name" onChange = {(e) => this.onHandleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAccount">Account</label>
                            <input type="text" className="form-control" id="inputAccount" name="username" onChange = {(e) => this.onHandleChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" name="password" onChange = {(e) => this.onHandleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="name@example.com" name="email" onChange = {(e) => this.onHandleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputRole">Role</label>
                            <select id="inputRole" className="form-control" name="role" onChange = {(e) => this.onHandleChange(e)}>
                                <option selected>Choose Role...</option>
                                <option value="DTU Event Center">DTU Event Center</option>
                                <option value="Event Organizer">DTU Event Staff</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary btn-block" onClick = {() => this.getCreateAccount()}>Create Account</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAccountForm;