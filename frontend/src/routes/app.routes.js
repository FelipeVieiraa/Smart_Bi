import React from 'react';
import { Route } from 'react-router-dom';

//Screens
import Default from '../pages/Default';
import Screen from '../pages/Screen';
import Activities from '../pages/Activities';

export default function AppRoutes() {
    return(
        <>
            <Route path="/" exact component={Default} />
            <Route path="/screen/:id" exact component={Screen} />
            <Route path="/activities" exact component={Activities} />
        </>
    )
}