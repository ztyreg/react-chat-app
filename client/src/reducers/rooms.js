import {CREATE_ROOM} from '../actions/types';

const initialState = {
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CREATE_ROOM:

        default:
            return state;
    }
}
