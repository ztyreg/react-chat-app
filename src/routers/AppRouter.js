import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import 'antd/dist/antd.css';
import ChatPage from "../components/ChatPage";
import RoomPage from "../components/RoomPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={RoomPage} exact={true}/>
                    <Route path="/rooms" component={RoomPage} exact={true}/>
                    <Route path="/chat" component={ChatPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;