import {Comment, List} from 'antd';
import React from "react";


const Messages = (props) => {

    return (
        <List
            className="comment-list"
            header={`${props.data.length} messages`}
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={item => (
                <li>
                    <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    />
                </li>
            )}
        />
    );
};

export default Messages;
