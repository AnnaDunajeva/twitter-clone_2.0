import { SOCKET_SET } from "../action-types";

export const setSocket = (socket) => ({
    type: SOCKET_SET,
    socket
})