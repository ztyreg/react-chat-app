import React, { useState, useEffect } from 'react';
import {Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Search } = Input;

const EditorForm = () => {

    return (
        <Search
            placeholder="Enter your message here"
            enterButton="Send"
            size="medium"
            onSearch={value => console.log(value)}
        />
    );
};

export default EditorForm;
