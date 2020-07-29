import {Modal, Button, Form, Input, Checkbox} from 'antd';
import React, {useState} from "react";
import {connect} from 'react-redux';
import {joinRoom} from "../../actions/rooms";
import PropTypes from "prop-types";
import {addHistory} from "../../actions/rooms";


const JoinRoomModal = ({joinRoom, username, joined_room, addHistory, avatar}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [password, setPassword] = useState(undefined);

    const showModal = () => {
        setVisible(true);
    };

    const onFinish = async (values) => {
        setConfirmLoading(true);

        if (password) {
            values.password = password ? password : "";
        }

        joinRoom(values);

        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button type={"primary"} onClick={showModal} style={{marginBottom: 8}} size={"large"} block
                    disabled={joined_room}>
                Join New Room
            </Button>
            <Modal
                title="Join Room"
                visible={visible}
                footer={[
                    <Button key={"cancel"} type={"secondary"} onClick={handleCancel}>Cancel</Button>,
                    <Button form="joinRoomForm" key="submit" htmlType="submit" type={"primary"}
                            loading={confirmLoading}>
                        Submit
                    </Button>
                ]}
            >
                <Form
                    name="joinRoomForm"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input your room name!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: false, message: 'Please input your password!'}]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)}/>
                        Enter password if the chatroom is private
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

JoinRoomModal.propTypes = {
    avatar: PropTypes.string,
    joinRoom: PropTypes.func.isRequired,
    username: PropTypes.string,
    joined_room: PropTypes.string
};

const mapStateToProps = state => ({
    avatar: state.auth.user && state.auth.user.avatar,
    username: state.auth.user && state.auth.user.username,
    joined_room: state.rooms.joined_room
});

export default connect(mapStateToProps, {joinRoom, addHistory})(JoinRoomModal);