import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from "../components/Navbar";
import { Route, Switch } from "react-router-dom";
import SignIn from "../containers/SignIn";
import SignUp from "../containers/SignUp";
import NotFoundPage from "../containers/NotFoundPage";
import HomePage from "../components/HomePage";
import {withStyles} from "@material-ui/core";
import ProductTable from "../containers/ProductTable";
import UserPage from "../containers/UserPage";

import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'react-router-redux'



const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const userIsAuthenticated = connectedReduxRedirect({
    redirectPath: '/login',
    authenticatedSelector: (state) =>  state.auth.isAuth !== false,
    wrapperDisplayName: 'UserIsAuthenticated',
    // This should be a redux action creator
    redirectAction: routerActions.replace,
})

class App extends Component {
    render() {
    return (
        <div className={this.props.classes.root}>
            <Navbar/>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={SignIn} />
                <Route path="/user" component={userIsAuthenticated(UserPage)} />
                <Route path="/register" component={SignUp} />
                <Route path="/product" component={userIsAuthenticated(ProductTable)} />
                <Route path="*" component={NotFoundPage} />
              </Switch>
        </div>
    );
  }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (App);
