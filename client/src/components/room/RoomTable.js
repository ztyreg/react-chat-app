import React, {useState} from "react";
import {Table, Button, Divider, Affix} from 'antd';
import CreateRoomModal from "./CreateRoomModal";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


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
                <Button key={"1"} type={"primary"} style={{marginBottom: 8}} size={"large"} block>
                    Join New Room
                </Button>
                <CreateRoomModal key={"2"}/>
                <Button key={"3"} size={"large"} block danger disabled={!joined_room}>
                    Leave Current Room
                </Button>
            </div>
        </>
    );
};

RoomTable.propTypes = {
    joined_room: PropTypes.string
};

const mapStateToProps = state => ({
    joined_room: state.auth.user.joined_rooms[0]
});


export default connect(mapStateToProps)(RoomTable);
