import React from 'react';
const HeaderLogin = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: '#eeeeee', width: '100%'}}>
                <div className="navbar-brand ml-5" to="/event">
                        <img style={{width: '150px', height: '50px'}} src="https://cdn.duytan.edu.vn/images/icon/logo-duy-tan_vn.png" alt="Event Management DTU" />
                </div>
            </nav>
        </div>
    );
}

export default HeaderLogin;