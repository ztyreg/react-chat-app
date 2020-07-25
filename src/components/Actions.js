import React from 'react';
import {PageHeader} from 'antd';
import JoinChat from "./JoinChat";

const Actions = () => {
    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
                extra={[
                    <JoinChat key={"1"}/>
                ]}
            >
            </PageHeader>
        </div>
    );
}

export default Actions;
