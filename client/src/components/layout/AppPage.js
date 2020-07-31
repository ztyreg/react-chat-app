import React, {useState} from "react";
import JoinRoomModal from "../room/JoinRoomModal";
import CreateRoomModal from "../room/CreateRoomModal";
import LeaveRoomModal from "../room/LeaveRoomModal";

const AppPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = value => {
        setCollapsed(value);
    };

    return (
        <>
            <JoinRoomModal key={"1"}/>
            <CreateRoomModal key={"2"}/>
            <LeaveRoomModal key={"3"}/>
        </>
    );

};