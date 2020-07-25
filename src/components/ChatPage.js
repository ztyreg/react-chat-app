import React, {useState} from "react";
import {Affix, Layout} from "antd";
import SideBar from "./SideBar";
import Title from "./Title";
import RoomTable from "./RoomTable";
import Message from "./Message";
import EditorForm from "./EditorForm";
import { Divider } from 'antd';

const {Header, Content, Footer, Sider} = Layout;

const ChatPage = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = value => {
        setCollapsed(value);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <Message/>
                </Content>
                <Affix offsetBottom={10} style={{marginLeft: '16px', marginRight: '16px'}}>
                    <EditorForm/>
                </Affix>
            </Layout>
        </Layout>
    );
};

export default ChatPage;