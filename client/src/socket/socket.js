import io from 'socket.io-client';
import store from "../store";
import {ADD_HISTORY, CHANGE_MEMBER, ROOM_ERROR} from "../actions/types";
import React from "react";

const ENDPOINT = 'http://localhost:' + process.env.REACT_APP_SERVER_PORT;
const socket = io(ENDPOINT);

socket.on('message', (message) => {
    console.log('RECEIVED', message);
    store.dispatch({
        type: ADD_HISTORY,
        payload: {
            ...message,
            datetime: (
                <span>
                    {message.createdAt}
                </span>
            )
        }
    });
});

socket.on('roomData', (data) => {
    console.log(data);
    const members = data.users;
    console.log(members);
    try {
        store.dispatch({
            type: CHANGE_MEMBER,
            payload: {members}
        });
    } catch (err) {
        store.dispatch({
            type: ROOM_ERROR
        });
    }
});

export default socket;
