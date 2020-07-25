import React, {useState} from "react";
import {Layout} from "antd";
import SideBar from "./SideBar";
import Title from "./Title";
import RoomTable from "./RoomTable";

const ChatPage = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = value => {
        setCollapsed(value);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
            <Layout className="site-layout">
            </Layout>
        </Layout>
    );
};

export default ChatPage;