import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import rooms from "./rooms";

export default combineReducers({
    alert,
    auth,
    rooms,
});
