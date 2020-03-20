import { 
    SESSION_END_SUCCESS,
    SOCKET_SET
} from '../action-types'


export default function (state = null, action) {
    switch (action.type) {
        case SOCKET_SET:
            return action.socket
        case SESSION_END_SUCCESS: 
            return null
        default:
            return state
    }
}