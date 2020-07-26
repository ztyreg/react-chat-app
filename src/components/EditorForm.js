import React from 'react';
import {Input} from 'antd';

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
