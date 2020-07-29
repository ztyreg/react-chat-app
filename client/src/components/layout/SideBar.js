import {Layout, Menu} from "antd";
import {DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useRouteMatch, useLocation} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import PropTypes from 'prop-types';

const {Sider} = Layout;
const {SubMenu} = Menu;

const SideBar = ({collapsed, onCollapse, logout, joined_room}) => {
    const pathname = useLocation().pathname;
    const match = useRouteMatch("/chat");
    const urlDefaultKeys = {
        '/rooms': '1',
        '/chat': '2'
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
            <Menu theme="dark" defaultSelectedKeys={[urlDefaultKeys[pathname]]} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    <Link to={"/rooms"}>Rooms</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    <Link to={"/chat"}>Chat</Link>
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Members" disabled={!match}>
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="Account">
                    <Menu.Item key="5">
                        <Link to={"/login"} onClick={logout}>Logout</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

SideBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    joined_room: PropTypes.string
};

const mapStateToProps = state => ({
    auth: state.auth,
    joined_room: state.rooms.joined_room
});

export default connect(mapStateToProps, {logout})(SideBar);

