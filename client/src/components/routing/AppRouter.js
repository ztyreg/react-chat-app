import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import ChatPage from "../ChatPage";
import RoomPage from "../RoomPage";
import Login from "../auth/Login";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/rooms" component={RoomPage}/>
                    <Route exact path="/chat" component={ChatPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;