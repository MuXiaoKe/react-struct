import React from "react";

import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TodoList from '../views/todoList/TodoList';
import IndexPage from '../views/Index';
const AppRouter = function (){
    return (
        <Router>
            <Switch>
                <Route path="/app" exact><IndexPage /></Route>
                <Route path="/login" exact><IndexPage /></Route>
                <Redirect exact from="/" to="/app" />
            </Switch>
        </Router>
    )
} 
export default AppRouter