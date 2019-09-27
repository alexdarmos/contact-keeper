//This allows us to add a PrivateRouter to any link, this will verify that the user isAuthenticated before accessing the home page\
//PrivateRouter added to home route in App.js

import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;


    return (
       <Route {...rest} render={props => !isAuthenticated && !loading ? (
           <Redirect to='/login' />
       ) : (
           <Component { ...props }/>
       )
    }
     />
    )
}

export default PrivateRoute
