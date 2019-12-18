import React from "react";

import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import IndexPage from "../views/index";
import NotFound from "../views/404";
const AppRouter = function() {
    return (
        <Router>
            <Switch>
                <Route path="/app">
                    <IndexPage />
                </Route>
                {/* <Route path="/login" exact>
                    <IndexPage />
                </Route> */}
                <Redirect exact from="/" to="/app" />
                <Route>
                    <NotFound />
                </Route> 
            </Switch>
        </Router>
    );
};

export default AppRouter;
