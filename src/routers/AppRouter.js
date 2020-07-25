import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import App from "../App";
import ChatPage from "../components/ChatPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={App} exact={true}/>
                    <Route path="/chat" component={ChatPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;