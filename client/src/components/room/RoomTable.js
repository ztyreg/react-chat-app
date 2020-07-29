import React, {useState} from "react";
import {Table, Button, Divider, Affix} from 'antd';
import CreateRoomModal from "./CreateRoomModal";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LeaveRoomModal from "./LeaveRoomModal";
import JoinRoomModal from "./JoinRoomModal";


const RoomTable = ({joined_room}) => {

    // start = () => {
    //     this.setState({loading: true});
    // ajax request after empty completing
    // setTimeout(() => {
    //     this.setState({
    //         loading: false,
    //     });
    // }, 1000);
    // };

    return (
        <>
            <div style={{marginBottom: 16}}>
                <JoinRoomModal key={"1"}/>
                <CreateRoomModal key={"2"}/>
                <LeaveRoomModal key={"3"}/>
            </div>
        </>
    );
};

RoomTable.propTypes = {
    joined_room: PropTypes.string
};

const mapStateToProps = state => ({
    joined_room: state.rooms.joined_room
});


export default connect(mapStateToProps)(RoomTable);
