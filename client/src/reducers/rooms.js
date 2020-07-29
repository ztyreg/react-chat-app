import {CREATE_ROOM, LEAVE_ROOM, LOAD_ROOM} from '../actions/types';

const initialState = {
    joined_room: null,
    owner: false
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CREATE_ROOM:
        case LEAVE_ROOM:
        case LOAD_ROOM:
            console.log('reducers/load', payload);
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}
