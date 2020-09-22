import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
    const { signed } = useContext(AuthContext);

    return(
           <BrowserRouter>
                <Switch>
                    {signed ? <AppRoutes/> : <AuthRoutes/>}
                </Switch>
            </BrowserRouter>
    )
}