import {Layout, Menu} from 'antd';
import RoomTitle from "./RoomTitle";
import RoomTable from "./RoomTable";
import React, {useState} from "react";
import SideBar from "../layout/SideBar";

const {Content, Footer} = Layout;

const RoomPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(true);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <RoomTitle/>
                        <RoomTable/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>© 2020 Ethan Zheng All Rights Reserved</Footer>
            </Layout>
        </Layout>
    );
}

export default RoomPage;
