import React from "react";
import {Modal, Button} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

import {connect} from 'react-redux';
import {leaveRoom} from "../../actions/rooms";
import PropTypes from "prop-types";

const {confirm} = Modal;


const LeaveRoomModal = ({leaveRoom, owner_username, joined_room}) => {

    const showConfirm = () => confirm({
        title: 'Leaving room',
        icon: <ExclamationCircleOutlined/>,
        content: 'Do you want to leave current room?',
        onOk() {
            leaveRoom();
        },
        onCancel() {
        },
    });

    return (
        <>
            <Button key={"3"} size={"large"} style={{marginBottom: 8}} onClick={showConfirm} block danger
                    disabled={!joined_room}>
                Leave Current Room
            </Button>
        </>
    );
};

LeaveRoomModal.propTypes = {
    leaveRoom: PropTypes.func.isRequired,
    owner_username: PropTypes.string,
    joined_room: PropTypes.string
};

const mapStateToProps = state => ({
    owner_username: state.auth.user && state.auth.user.username,
    joined_room: state.rooms.joined_room
});

export default connect(mapStateToProps, {leaveRoom})(LeaveRoomModal);