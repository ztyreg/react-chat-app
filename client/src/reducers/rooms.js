import {ADD_HISTORY, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, LOAD_ROOM} from '../actions/types';

const initialState = {
    joined_room: null,
    owner: false,
    history: []
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CREATE_ROOM:
        case LEAVE_ROOM:
        case LOAD_ROOM:
        case JOIN_ROOM:
            return {
                ...state,
                ...payload,
                history: []
            }
        case ADD_HISTORY:
            console.log(state.history);
            console.log(payload);
            return {
                ...state,
                history: [...state.history, payload]
            }
        default:
            return state;
    }
}
