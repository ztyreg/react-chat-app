import api from '../utils/api';
import {setAlert} from './alert';
import {
    CREATE_ROOM, GET_ROOM_MEMBERS, JOIN_ROOM, LEAVE_ROOM, LOAD_ROOM,
    ROOM_ERROR
} from './types';

// Join room
export const joinRoom = formData => async dispatch => {
    try {
        console.log('Joining');
        const res = await api.post('/rooms', formData);
        console.log('Joining');

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

// Leave room
export const leaveRoom = formData => async dispatch => {
    try {
        const res = await api.delete('/rooms', formData);

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

// Load room
export const loadRoom = formData => async dispatch => {
    try {
        const res = await api.get('/rooms', formData);

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
