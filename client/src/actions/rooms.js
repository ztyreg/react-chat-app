import api from '../utils/api';
import {setAlert} from './alert';
import {
    CREATE_ROOM, GET_ROOM_MEMBERS, JOIN_ROOM, LEAVE_ROOM, LOAD_ROOM,
    ROOM_ERROR, ADD_HISTORY, CHANGE_MEMBER
} from './types';
import {Tooltip} from "antd";
import moment from "moment";
import React from "react";
import socket from "../socket/socket";
import store from '../store';


// change member
export const changeMember = members => async dispatch => {

};

export const addHistory = (message, avatar) => async dispatch => {
    console.log('addHistory');
    dispatch({
        type: ADD_HISTORY,
        payload: {
            ...message,
            avatar,
            datetime: (
                <Tooltip
                    title={moment()
                        .subtract(1, 'days')
                        .format('YYYY-MM-DD HH:mm:ss')}
                >
                <span>
                  {moment()
                      .subtract(1, 'days')
                      .fromNow()}
                </span>
                </Tooltip>
            )
        }
    });
};

// Join room
export const joinRoom = formData => async dispatch => {
    try {
        const res = await api.post('/rooms', formData);
        setupRoom(res.data);

        dispatch({
            type: JOIN_ROOM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR
        });
    }
};

// Create room
export const createRoom = formData => async dispatch => {
    try {
        const res = await api.post('/rooms/create', formData);
        setupRoom(res.data);

        dispatch({
            type: CREATE_ROOM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR
        });
    }
};

// Load room
export const loadRoom = formData => async dispatch => {
    try {
        const res = await api.get('/rooms', formData);
        setupRoom(res.data);

        dispatch({
            type: LOAD_ROOM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR
        });
    }
};
// Leave room
export const leaveRoom = formData => async dispatch => {
    try {
        const res = await api.delete('/rooms', formData);
        socket.disconnect();

        dispatch({
            type: LEAVE_ROOM,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR
        });
    }
};


// Get room members
export const getRoomMembers = name => async dispatch => {
    try {
        const res = await api.get(`/rooms/${name}`);

        dispatch({
            type: GET_ROOM_MEMBERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ROOM_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

const setupRoom = (user) => {
    socket.emit('join', {username: user.username}, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('Joined!');
    });
    socket.on('message', (message) => {
        console.log('RECEIVED', message);
        store.dispatch({
            type: ADD_HISTORY,
            payload: {
                ...message,
                avatar: user.avatar,
                datetime: (
                    <Tooltip
                        title={moment()
                            .subtract(1, 'days')
                            .format('YYYY-MM-DD HH:mm:ss')}
                    >
                <span>
                  {moment()
                      .subtract(1, 'days')
                      .fromNow()}
                </span>
                    </Tooltip>
                )
            }
        });
        // addHistory(message, user.avatar);
    });

    socket.on('roomData', (data) => {
        const members = data.users.map((user) => user.username);
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
};

