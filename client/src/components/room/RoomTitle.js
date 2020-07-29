import React from 'react';
import {PageHeader} from 'antd';

const RoomTitle = () => {
    return (
        <div className="site-page-header-ghost-wrapper" style={{marginBottom: 16}}>
            <PageHeader
                ghost={false}
                // onBack={() => window.history.back()}
                title="Rooms"
                subTitle="Find your new room here."
                extra={[
                ]}
            >
            </PageHeader>
        </div>
    );
}

export default RoomTitle;
