import React, {useEffect, useState} from "react";
import {Affix, Layout} from "antd";
import SideBar from "../layout/SideBar";
import Messages from "./Messages";
import socketIOClient from "socket.io-client";
import {Input} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addHistory, changeMember} from "../../actions/rooms";

const {Search} = Input;
const {Content} = Layout;

const ENDPOINT = "http://127.0.0.1:" + process.env.REACT_APP_SERVER_PORT;
const socket = socketIOClient(ENDPOINT);


const ChatPage = ({auth, rooms, addHistory, changeMember}) => {
    const avatar = auth.user && auth.user.avatar;
    const username = auth.user && auth.user.username;
    const joined_room = rooms.joined_room;
    const is_owner = rooms.owner;
    const history = rooms.history;

    const [collapsed, setCollapsed] = useState(false);


    const onCollapse = value => {
        setCollapsed(value);
    };

    /**
     * Send message
     * @param value
     */
    const onSearch = (value) => {
        if (is_owner) {
            const regex = /^\/(ban|kick|private)\s+(.+)$/;
            const match = value.match(regex);
            console.log(match);
            if (match) {
                const [, command, user] = match;
                console.log(user);
            }
        }

        socket.emit('sendMessage', value, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message delivered!')
        });
    };

    /**
     * Add message listener
     */
    useEffect(() => {
        socket.on('message', (message) => {
            addHistory(message, avatar);
            // autoscroll()
        });

        socket.on('roomData', (data) => {
            changeMember(data.users.map((user) => user.username));
        });

        // CLEAN UP THE EFFECT
        // return () => socket.disconnect();

    }, []);

    /**
     * Change room
     */
    useEffect(() => {
        // socket.disconnect();
        if (joined_room) {
            socket.emit('join', {username, room: joined_room}, (error) => {
                if (error) {
                    console.log(error);
                }
                console.log('Joined!');
            });
            // socket.on('message', (message) => {
            //     addHistory(message, avatar);
            //     autoscroll()
            // });
            //
            // socket.on('roomData', (data) => {
            //     changeMember(data.users.map((user) => user.username));
            // });
        }
    }, [username, joined_room]);


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

export default connect(mapStateToProps, {addHistory, changeMember})(ChatPage);
