import {Modal, Button, Form, Input} from 'antd';
import React, {useState} from "react";
import {connect} from 'react-redux';
import {joinRoom} from "../../actions/rooms";
import PropTypes from "prop-types";


const JoinRoomModal = ({auth, rooms, joinRoom}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [password, setPassword] = useState(undefined);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

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
                    disabled={rooms.joined_room}>
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
                    {...layout}
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
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps, {joinRoom})(JoinRoomModal);