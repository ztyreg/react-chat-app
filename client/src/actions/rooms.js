import api from '../utils/api';
import {setAlert} from './alert';
import {
    CREATE_ROOM,
    ROOM_ERROR
} from './types';

// Load User
export const createRoom = formData => async dispatch => {
    try {
        const res = await api.post('/rooms', formData);

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
