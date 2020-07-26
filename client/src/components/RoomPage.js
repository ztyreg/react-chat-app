import {Layout, Menu} from 'antd';
import Title from "./Title";
import RoomTable from "./RoomTable";
import React from "react";
import SideBar from "./SideBar";

const {Content, Footer} = Layout;

class RoomPage extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <SideBar collapsed={this.state.collapsed} onCollapse={this.onCollapse}/>
                <Layout className="site-layout">
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Title/>
                            <RoomTable/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default RoomPage;
