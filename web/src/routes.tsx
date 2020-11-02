import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrfanatosMap from './pages/OrfanatosMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route  path='/' exact component={Landing}/>
                <Route  path='/app'  component={OrfanatosMap}/>
                <Route  path='/orphanage/create' component={CreateOrphanage}/>
                <Route  path='/orphanage/:id'  component={Orphanage}/>
                
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;