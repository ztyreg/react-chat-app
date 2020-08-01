import {Modal, Button, Form, Input} from 'antd';
import React, {useState} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import socket from "../../socket/socket";
import {Link} from "react-router-dom";


const PrivateMessageModal = ({member, auth}) => {
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const username = auth.user && auth.user.username;

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
    };

    const showModal = () => {
        setVisible(true);
    };

    const onFinish = async () => {
        setConfirmLoading(true);

        socket.emit('sendPrivateMessage', {username, member, message}, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log('Private message delivered!')
        });

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
            <Link to={"/chat"} onClick={showModal}>{member}</Link>
            <Modal
                title={"Send Private Message To " + member}
                visible={visible}
                footer={[
                    <Button key={"cancel"} type={"secondary"} onClick={handleCancel}>Cancel</Button>,
                    <Button form="privateMessageForm" key="submit" htmlType="submit" type={"primary"}
                            loading={confirmLoading}>
                        Submit
                    </Button>
                ]}
            >
                <Form
                    {...layout}
                    name="privateMessageForm"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Message"
                        rules={[{required: true, message: 'Please input your message!'}]}
                    >
                        <Input onChange={e => setMessage(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

PrivateMessageModal.propTypes = {
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps)(PrivateMessageModal);

