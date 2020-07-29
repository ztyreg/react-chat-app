import React from "react";
import CreateRoomModal from "./CreateRoomModal";
import LeaveRoomModal from "./LeaveRoomModal";
import JoinRoomModal from "./JoinRoomModal";


const RoomTable = () => {


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


export default RoomTable;
