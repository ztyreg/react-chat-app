import React from 'react';
import {PageHeader} from 'antd';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const RoomTitle = ({auth, rooms}) => {
    return (
        <div className="site-page-header-ghost-wrapper" style={{marginBottom: 16}}>
            <PageHeader
                ghost={false}
                title={"Hello "+ (auth.user && auth.user.username)}
                subTitle={rooms.joined_room && "You are in room " + rooms.joined_room}
                extra={[
                ]}
            >
            </PageHeader>
        </div>
    );
}

RoomTitle.propTypes = {
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps)(RoomTitle);
