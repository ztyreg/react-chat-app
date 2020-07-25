import React from 'react';
import {Button, PageHeader} from 'antd';
import JoinChat from "./JoinChat";

const Actions = () => {
    return (
        <div className="site-page-header-ghost-wrapper" style={{marginBottom: 16}}>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
                extra={[
                    <Button key={"1"} type={"primary"}>&nbsp;&nbsp;Join&nbsp;&nbsp;</Button>,
                    <Button key={"2"} style={{marginLeft: 8}}>Create</Button>,
                    <Button key={"3"} style={{marginLeft: 8}} danger>Delete</Button>
                ]}
            >
            </PageHeader>
        </div>
    );
}

export default Actions;
