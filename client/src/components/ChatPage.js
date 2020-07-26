import React, {useEffect, useState} from "react";
import {Affix, Layout} from "antd";
import SideBar from "./SideBar";
import Message from "./Message";
import socketIOClient from "socket.io-client";
import {Input} from 'antd';

const {Search} = Input;
const {Content} = Layout;

const ENDPOINT = "http://127.0.0.1:3001";

let socket;

const ChatPage = (props) => {
    const [collapsed, setCollapsed] = useState(false);


    const onCollapse = value => {
        setCollapsed(value);
    };

    const onSearch = (value) => {
        socket.emit('sendMessage', 'TEST', (error) => {
            if (error) {
                return console.log(error)
            }
            console.log('Message delivered!')
        });
    };

    useEffect(() => {
        socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            console.log(data);
        });

        socket.emit('join', {}, (error) => {
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
                    <Message/>
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