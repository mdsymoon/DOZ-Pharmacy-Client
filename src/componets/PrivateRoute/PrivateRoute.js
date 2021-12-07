import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getLoggedInUser } from '../../redux/loginSlice/loginSlice';

const PrivateRoute = ({children}) => {
    const loggedInUser = useSelector(getLoggedInUser);
    return loggedInUser.email? children : <Navigate to="/login"/>
};

export default PrivateRoute;