import {Layout} from 'antd';
import RoomTitle from "./RoomTitle";
import RoomActions from "./RoomActions";
import React, {useState} from "react";
import SideBar from "../layout/SideBar";

const {Content, Footer} = Layout;

const RoomPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(true);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <RoomTitle/>
                        <RoomActions/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>© 2020 Ethan Zheng All Rights Reserved</Footer>
            </Layout>
        </Layout>
    );
}

export default RoomPage;
