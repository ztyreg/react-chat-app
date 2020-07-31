import api from '../utils/api';
import {
    CREATE_ROOM, GET_ROOM_MEMBERS, JOIN_ROOM, LEAVE_ROOM, LOAD_ROOM,
    ROOM_ERROR, ADD_HISTORY, CHANGE_MEMBER
} from './types';
import React from "react";
import socket from "../socket/socket";
import store from '../store';


// Join room
export const joinRoom = formData => async dispatch => {
    try {
        const res = await api.post('/rooms', formData);
        joinSocket(res.data);

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
        joinSocket(res.data);

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
        joinSocket(res.data);

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
        console.log('LEAVE');

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

const joinSocket = (user) => {
    socket.emit('join', {username: user.username}, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('JOIN');
    });
};

const leaveSocket = (user) => {
    socket.emit('leave', {username: user.username}, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('LEAVE');
    });
};

