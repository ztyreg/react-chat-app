import {CREATE_ROOM} from '../actions/types';

const initialState = {
    joined_room: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CREATE_ROOM:
            return {
                joined_room: payload
            };
        default:
            return state;
    }
}
