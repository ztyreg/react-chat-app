import React from "react";
import CreateRoomModal from "./CreateRoomModal";
import LeaveRoomModal from "./LeaveRoomModal";
import JoinRoomModal from "./JoinRoomModal";


const RoomActions = () => {
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


export default RoomActions;
