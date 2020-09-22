import React from 'react';
import { Route } from 'react-router-dom';

//Screens
import Logon from '../pages/Logon';
import Register from '../pages/Register';

export default function AuthRoutes() {
    return(
        <>
            <Route path="/" exact component={Logon} />
            <Route path="/register" exact component={Register} />
        </>
    )
}