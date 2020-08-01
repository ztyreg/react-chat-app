import io from 'socket.io-client';
import store from "../store";
import {ADD_HISTORY, CHANGE_MEMBER, ROOM_ERROR} from "../actions/types";
import React from "react";

// const port = process.env.PORT | process.env.REACT_APP_SERVER_PORT;
// const ENDPOINT = 'http://localhost:' + port;
const ENDPOINT = 'https://intense-temple-81745.herokuapp.com/';
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
    const members = data.users;
    console.log('MEMBER', members);
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
