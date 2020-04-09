import {useSelector} from 'react-redux'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'

const useAuthedUserCredentials = () => {
    //NB! getting items from local storage can failt if user privacy settings does not allow to use local storage, needs to be wrapper
    //in try catch
    const authedUser = useSelector(getAuthedUserId())
    
    return {
        user: {
            userId: authedUser || localStorage.getItem('userId'),
            // token: localStorage.getItem('token')
        }
    }
}

export default useAuthedUserCredentials