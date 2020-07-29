import React, {useEffect, useState} from "react";
import {Affix, Layout, Tooltip} from "antd";
import SideBar from "./SideBar";
import Messages from "./Messages";
import socketIOClient from "socket.io-client";
import {Input} from 'antd';
import moment from "moment";

const {Search} = Input;
const {Content} = Layout;

const ENDPOINT = "http://127.0.0.1:5000";

let socket;

const ChatPage = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);

    const addData = (message) => {
        setData((oldData) => [...oldData, {
            ...message,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
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
                return console.log(error)
            }
            console.log('Message delivered!')
        });
    };

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);

        socket.on('message', (message) => {
            addData(message);
            // const html = Mustache.render(messageTemplate, {
            //     username: message.username,
            //     message: message.text,
            //     createdAt: moment(message.createdAt).format('h:mm a')
            // })
            // $messages.insertAdjacentHTML('beforeend', html)
            // autoscroll()
        });

        socket.emit('join', {username: 'user', room: 'room'}, (error) => {
            console.log('callback');
            // if (error) {
            //     alert(error)
            //     location.href = '/'
            // }
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
    }, []);


    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBar collapsed={collapsed} onCollapse={onCollapse}/>
            <Layout className="site-layout">
                <Content style={{margin: '0 16px'}}>
                    <Messages data={data}/>
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

export default ChatPage;