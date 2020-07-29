import {Modal, Button, Form, Input} from 'antd';
import React, {useState} from "react";
import {connect} from 'react-redux';
import {createRoom} from "../../actions/rooms";
import PropTypes from "prop-types";

const CreateRoomModal = ({createRoom, owner_username, joined_room}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [password, setPassword] = useState(undefined);

    const showModal = () => {
        setVisible(true);
    };

    const onFinish = (values) => {
        values.owner_username = owner_username;
        if (password) {
            values.password = password ? password : "";
        }
        console.log(values);
        setConfirmLoading(true);
        createRoom(values);
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
            <Button type="secondary" onClick={showModal} size={"large"} style={{marginBottom: 8}} block
                    disabled={joined_room}>
                Create New Room
            </Button>
            <Modal
                title="Create Room"
                visible={visible}
                footer={[
                    <Button key={"cancel"} type={"secondary"} onClick={handleCancel}>Cancel</Button>,
                    <Button form="createRoomForm" key="submit" htmlType="submit" type={"primary"}
                            loading={confirmLoading}>
                        Submit
                    </Button>
                ]}
            >
                <Form
                    name="createRoomForm"
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
                        rules={[{message: 'Please input your password!'}]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)}/>
                        Leave password blank if you want to make it public
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

CreateRoomModal.propTypes = {
    createRoom: PropTypes.func.isRequired,
    owner_username: PropTypes.string,
    joined_room: PropTypes.string
};

const mapStateToProps = state => ({
    owner_username: state.auth.user && state.auth.user.username,
    joined_room: state.rooms.joined_room
});

export default connect(mapStateToProps, {createRoom})(CreateRoomModal);