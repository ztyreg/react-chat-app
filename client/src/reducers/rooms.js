import {ADD_HISTORY, CHANGE_MEMBER, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, LOAD_ROOM} from '../actions/types';

const initialState = {
    joined_room: null,
    owner: false,
    history: [],
    members: []
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CREATE_ROOM:
        case LOAD_ROOM:
        case JOIN_ROOM:
            return {
                ...state,
                joined_room: payload.joined_room.name,
                owner: payload.joined_room.owner,
                history: []
            }
        case LEAVE_ROOM:
            return {
                ...state,
                joined_room: null,
                owner: false,
                history: []
            }
        case ADD_HISTORY:
            return {
                ...state,
                history: [...state.history, payload]
            }
        case CHANGE_MEMBER:
            return {
                ...state,
                members: payload.members
            }
        default:
            return state;
    }
}
