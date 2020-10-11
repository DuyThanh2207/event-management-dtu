import React, { Component } from 'react';

class EditAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editData.account_id,
            name: this.props.editData.account_name,
            username: this.props.editData.account_username,
            email: this.props.editData.account_email,
            role: this.props.editData.account_role
        }
    }
    
    onHandleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }
    onGetEditUser = () => {
        this.props.changeEditStatus()
        this.props.getEditUser(this.state)
    }
    render() {
        return (
            <div className="card col-3" style={{width: '100%'}}>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" id="inputName" defaultValue = {this.state.name} onChange = {(e) => this.onHandleChange(e)} name="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAccount">Account</label>
                            <input type="text" className="form-control" id="inputAccount" defaultValue = {this.state.username} name="username" onChange = {(e) => this.onHandleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" className="form-control" id="inputEmail" name = "email" aria-describedby="emailHelp" defaultValue={this.state.email} onChange = {(e) => this.onHandleChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputRole">Role</label>
                            <select id="inputRole" className="form-control" defaultValue = {this.state.role} name="role" onChange = {(e) => this.onHandleChange(e)}>
                                <option>Choose Role...</option>
                                <option value="DTU Event Center">DTU Event Center</option>
                                <option value="DTU Event Staff">DTU Event Staff</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-warning btn-block" onClick = {(e) => this.onGetEditUser(e)}>Edit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditAccountForm;