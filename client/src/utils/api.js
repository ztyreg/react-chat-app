import axios from 'axios';
import store from '../store';
import {LOGOUT} from '../actions/types';

const port = process.env.PORT | process.env.REACT_APP_SERVER_PORT;

const api = axios.create({
    baseURL: 'http://localhost:' + port + '/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
 **/

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response.data.msg === 'Token is not valid') {
            store.dispatch({type: LOGOUT});
        }
        return Promise.reject(err);
    }
);

export default api;
