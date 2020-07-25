import {Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Title from "./Title";
import ChatList from "./ChatList";
import React from "react";
import {Link} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;



class SiderContainer extends React.Component {
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
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div>TEST</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            Rooms
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            <Link to={"/chat"}>Chat</Link>
                        </Menu.Item>
                        <SubMenu key="sub2" icon={<TeamOutlined/>} title="Users" disabled={true}>
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="Account">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined/>}/>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Title/>
                            <ChatList/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderContainer;
