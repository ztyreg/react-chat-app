import React from 'react';
import 'antd/dist/antd.css';
import Actions from "./components/Actions";
import ChatList from "./components/ChatList";

const App = () => {
    return (
        <div>
            <Header/>
            <Actions/>
            <ChatList/>
        </div>
    );
};

const Header = () => {
    return (
        <div>
            <h1>
                Chat App
            </h1>
        </div>
    );
};

// const Footer = () => {
//     return (
//         <div>
//             Chat app
//         </div>
//     );
// };


export default App;
