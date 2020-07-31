import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://localhost:' + process.env.REACT_APP_SERVER_PORT;
const socket = socketIOClient(ENDPOINT);
export default socket;
