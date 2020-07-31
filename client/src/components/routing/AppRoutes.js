import {Route, Switch} from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import ChatPage from "../chat/ChatPage";
import RoomPage from "../room/RoomPage";
import Alert from "../layout/Alert";
import PrivateRoute from "./PrivateRoute";
import Landing from "../auth/Landing";

const AppRoutes = () => {

    return (
        <>
            <Alert/>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <PrivateRoute exact path="/rooms" component={RoomPage}/>
                <PrivateRoute exact path="/chat" component={ChatPage}/>
                <Route component={Landing} />
            </Switch>
        </>
    );
};

export default AppRoutes;