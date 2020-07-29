import {Route, Switch} from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import ChatPage from "../ChatPage";
import RoomPage from "../RoomPage";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Register from "../auth/Register";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return (
        <>
            <Alert/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/rooms" component={RoomPage}/>
                <PrivateRoute exact path="/chat" component={ChatPage}/>
            </Switch>
        </>
    );
};

export default AppRoutes;