import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import ChatPage from "../ChatPage";
import RoomPage from "../RoomPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={RoomPage}/>
                    <Route exact path="/rooms" component={RoomPage}/>
                    <Route exact path="/chat" component={ChatPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;