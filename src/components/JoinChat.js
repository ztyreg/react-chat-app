import React from 'react';
import {Menu, Dropdown, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';

function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined/>}>
            Create new chat
        </Menu.Item>
    </Menu>
);


const JoinChat = () => {
    return (
        <>
            <Dropdown.Button onClick={handleButtonClick} overlay={menu} type={"primary"}>
                Join chat
            </Dropdown.Button>
        </>
    );
};

export default JoinChat;