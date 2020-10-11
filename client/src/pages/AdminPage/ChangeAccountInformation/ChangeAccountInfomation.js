import React from 'react';
const ChangeAccountInfomation = () => {
    return (
        <div>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card" style={{width: '50%'}}>
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                            <label htmlFor="inputOldPassword">Old Password</label>
                            <input type="password" className="form-control" id="inputOldPassword" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNewPassword">New Password</label>
                            <input type="password" className="form-control" id="inputNewPassword" />
                        </div>
                        <a href="admin-homepage.html">
                            <button type="button" className="btn btn-primary">Submit</button>                    
                        </a>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeAccountInfomation;