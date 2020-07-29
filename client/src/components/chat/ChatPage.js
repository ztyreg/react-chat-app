import React, {useEffect, useState} from "react";
import {Affix, Layout, Tooltip} from "antd";
import SideBar from "../layout/SideBar";
import Messages from "./Messages";
import socketIOClient from "socket.io-client";
import {Input} from 'antd';
import moment from "moment";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addHistory} from "../../actions/rooms";

const {Search} = Input;
const {Content} = Layout;

const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);


const ChatPage = ({avatar, username, joined_room, history, addHistory}) => {
    const [data, setData] = useState([]);
    const [collapsed, setCollapsed] = useState(false);


    const addData = (message) => {
        setData((oldData) => [...oldData, {
            ...message,
            avatar,
            datetime: (
                <Tooltip
                    title={moment()
                        .subtract(1, 'days')
                        .format('YYYY-MM-DD HH:mm:ss')}
                >
                <span>
                  {moment()
                      .subtract(1, 'days')
                      .fromNow()}
                </span>
                </Tooltip>
            )
        }]);
    };


    const onCollapse = value => {
        setCollapsed(value);
    };

    const onSearch = (value) => {
        socket.emit('sendMessage', value, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message delivered!')
        });
    };

    useEffect(() => {
        socket.on('message', (message) => {
            addHistory(message, avatar);
            // autoscroll()
        });

        socket.on('roomData', (data) => {
            console.log(data);
        });

        // CLEAN UP THE EFFECT
        // return () => socket.disconnect();

    }, []);

    useEffect(() => {
        if (joined_room) {
            socket.emit('join', {username, room: joined_room}, (error) => {
                if (error) {
                    console.log(error);
                }
                console.log('Joined!');
            });
        }
        // else {
        //     socket.disconnect();
        // }

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
    avatar: PropTypes.string,
    username: PropTypes.string,
    joined_room: PropTypes.string,
    history: PropTypes.array,
};

const mapStateToProps = state => ({
    avatar: state.auth.user && state.auth.user.avatar,
    username: state.auth.user && state.auth.user.username,
    joined_room: state.rooms.joined_room,
    history: state.rooms.history
});

export default connect(mapStateToProps, {addHistory})(ChatPage);
