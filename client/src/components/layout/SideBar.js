import {Layout, Menu} from "antd";
import {DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import PropTypes from 'prop-types';
import CommentOutlined from "@ant-design/icons/lib/icons/CommentOutlined";

const {Sider} = Layout;
const {SubMenu} = Menu;

const SideBar = ({collapsed, onCollapse, logout, rooms}) => {
    const pathname = useLocation().pathname;
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
                <Menu.Item key="chat" icon={<CommentOutlined/>} disabled={!rooms.joined_room}>
                    <Link to={"/chat"}>Chat</Link>
                </Menu.Item>
                <Menu.Item key="actions" icon={<DesktopOutlined/>} disabled={!rooms.joined_room}>
                    <Link to={"/chat"}>Actions</Link>
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Members" disabled={!rooms.joined_room}>
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
                        <Link to={"/"} onClick={logout}>Logout</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

SideBar.propTypes = {
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps, {logout})(SideBar);

