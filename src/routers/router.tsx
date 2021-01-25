import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Client from '../pages/client/clientCtr';
import Login from '../pages/login/loginCtr';

// Pages
import Cliente from '../pages/client/clientCtr';

interface ElementRoute { component: any; uri: string; validate: boolean }
const arrayRouters: ElementRoute[] = [
    { component: Client, uri: 'client', validate: true },
    { component: Login, uri: 'login', validate: false },
    { component: Login, uri: '', validate: false },
]


const Routers: any = (props: any) => {
    return <Switch>
        {arrayRouters.map((route: ElementRoute, i: number) => {
            return <Route key={i} exact path={`/${route.uri}`}>
                {route.validate ? props.state.isLogged ? <route.component {...props} /> : <Login {...props} /> : <route.component {...props} />}
            </Route>
        })}
    </Switch>
}

export default Routers;