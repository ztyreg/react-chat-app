import React from "react";
import {Affix, Layout} from "antd";
import Messages from "./Messages";
import {Input} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import socket from "../../socket/socket";

const {Search} = Input;
const {Content} = Layout;


const ChatPage = ({auth, rooms}) => {
    const username = auth.user && auth.user.username;
    const history = rooms.history;


    /**
     * Send message
     * @param message
     */
    const onSearch = (message) => {
        socket.emit('sendMessage', {username, message}, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message delivered!')
        });
    };


    return (
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
