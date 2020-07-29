import {Modal, Button} from 'antd';
import React, {useState} from "react";

const CreateRoomModal = () => {
    const [text, setText] = useState('TEST');
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setText('Creating Room...');
        setConfirmLoading(true);
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
            <Button type="secondary" onClick={showModal} style={{marginLeft: 8}}>
                &nbsp;&nbsp;Create&nbsp;&nbsp;
            </Button>
            <Modal
                title="Create Room"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{text}</p>
            </Modal>
        </>
    );
}

export default CreateRoomModal;