import {Layout} from 'antd';
import RoomTitle from "./RoomTitle";
import RoomActions from "./RoomActions";
import React from "react";

const {Content, Footer} = Layout;

const RoomPage = () => {

    return (
        <Layout className="site-layout">
            <Content style={{margin: '0 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <RoomTitle/>
                    <RoomActions/>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>© 2020 Ethan Zheng All Rights Reserved</Footer>
        </Layout>
    );
}

export default RoomPage;
