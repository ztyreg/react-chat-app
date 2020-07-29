import {Modal, Button, Form, Input, Checkbox} from 'antd';
import React, {useState} from "react";
import {connect} from 'react-redux';
import {createRoom} from "../../actions/rooms";
import PropTypes from "prop-types";

const CreateRoomModal = ({createRoom, owner_username}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const onFinish = (values) => {
        values.owner_username = owner_username;
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
            <Button type="secondary" onClick={showModal} size={"large"} style={{marginBottom: 8}} block>
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
                        rules={[{required: false, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                        Leave password blank if you want to make it public
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

CreateRoomModal.propTypes = {
    createRoom: PropTypes.func.isRequired,
    owner_username: PropTypes.string
};

const mapStateToProps = state => ({
    owner_username: state.auth.user.username
});

export default connect(mapStateToProps, {createRoom})(CreateRoomModal);