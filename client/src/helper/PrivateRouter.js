import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import React from 'react';
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          sessionStorage.getItem("loggedIn") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
export default PrivateRoute