import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import React from 'react';
function PublicRouter({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          sessionStorage.getItem("loggedIn") ? (
            <Redirect
            to={{
              pathname: "/event",
              state: { from: location }
            }}
          />      
          ) : (
            children
          )
        }
      />
    );
  }
export default PublicRouter