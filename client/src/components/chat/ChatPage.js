import React, {useState} from "react";
import {Affix, Layout} from "antd";
import SideBar from "../layout/SideBar";
import Messages from "./Messages";
import {Input} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";

const {Search} = Input;
const {Content} = Layout;

const ENDPOINT = "http://127.0.0.1:" + process.env.REACT_APP_SERVER_PORT;
const socket = socketIOClient(ENDPOINT);


const ChatPage = ({auth, rooms}) => {
    const username = auth.user && auth.user.username;
    const history = rooms.history;

    const [collapsed, setCollapsed] = useState(false);


    const onCollapse = value => {
        setCollapsed(value);
    };

    /**
     * Send message
     * @param message
     */
    const onSearch = (message) => {
        // if (is_owner) {
        //     const regex = /^\/(ban|kick|private)\s+(.+)$/;
        //     const match = value.match(regex);
        //     console.log(match);
        //     if (match) {
        //         const [, command, user] = match;
        //         console.log(user);
        //     }
        // }

        socket.emit('sendMessage', {username, message}, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message delivered!')
        });
    };


    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <Messages data={history}/>
                </Content>
                <Affix offsetBottom={10} style={{marginLeft: '16px', marginRight: '16px'}}>
                    <Search
                        placeholder="Enter your message here"
                        enterButton="Send"
                        size="medium"
                        onSearch={onSearch}
                    />
                </Affix>
            </Layout>
        </Layout>
    );
};

ChatPage.propTypes = {
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps)(ChatPage);
