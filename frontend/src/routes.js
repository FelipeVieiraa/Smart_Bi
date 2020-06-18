import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Screens
import Logon from './pages/Logon';
import Default from './pages/Default';
import Screen from './pages/Screen';
import Activities from './pages/Activities';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/default" exact component={Default} />
                <Route path="/screen/:id" exact component={Screen} />
                <Route path="/activities" exact component={Activities} />
            </Switch>
        </BrowserRouter>
    )
}