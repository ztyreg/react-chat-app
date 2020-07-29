import {Button, Dropdown, Layout, Menu, Modal} from "antd";
import {DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useRouteMatch, useLocation} from "react-router-dom";
import React, {useState} from "react";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import PropTypes from 'prop-types';
import CommentOutlined from "@ant-design/icons/lib/icons/CommentOutlined";

const {Sider} = Layout;
const {SubMenu} = Menu;

const SideBar = ({collapsed, onCollapse, logout, rooms}) => {
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
                <Menu.Item key="2" icon={<DesktopOutlined/>} disabled={!rooms.joined_room}>
                    <Link to={"/chat"}>Chat</Link>
                </Menu.Item>
                <SubMenu key="actions" icon={<CommentOutlined/>} title="Actions">
                    <Menu.Item key="private">
                        <Link >Private Chat</Link>
                    </Menu.Item>
                    <Menu.Item key="kick" disabled={!rooms.owner}>
                        <Link >Kick Out User</Link>
                    </Menu.Item>
                    <Menu.Item key="ban" disabled={!rooms.owner}>
                        <Link >Ban User</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Members" disabled={!match}>
                    {
                        rooms.members.map((member) => {
                            return (
                                <Menu.Item key={member}>
                                    {member}
                                </Menu.Item>
                            );
                        })
                    }
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
    rooms: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps, {logout})(SideBar);

