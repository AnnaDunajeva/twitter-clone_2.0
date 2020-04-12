import React from 'react'
import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
import {useSelector, useDispatch} from 'react-redux'
import {getUserById, getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {LOADED, UPDATING, UPDATED} from '../redux-store-2.0/constants'
import ProfileDataSideBar from './ProfileDataSideBar'
import ToBeImplemented from './ToBeImplemented'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import General from './GeneralUserData'
import Additional from './AdditionalUserData'
import {updateProfile} from '../redux-store-2.0/api/users'
import {getProfileUpdateError} from '../redux-store-2.0/errors/selectors'
import Alert from './Alert'
import {usersFetchStatusSet} from '../redux-store-2.0/entities/users/actions'
import {deleteAvatar} from '../redux-store-2.0/api/users'
import {deleteBackgroundImage} from '../redux-store-2.0/api/users'
// import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'
import {getUserIdFromCookie} from '../utils/helpers'

const ProfileUpdate = (props) => {
    // const userCredentials = useAuthedUserCredentials()
    // const userId = userCredentials.user.userId
    const userId = getUserIdFromCookie()
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))
    const profileUpdateError = useSelector(getProfileUpdateError())
    const dispatch = useDispatch()

    const updateProfileData = (userDataAndFile) => {
        const data = {
            // ...userCredentials,
            userData: userDataAndFile.user
        }
        if (userDataAndFile.file) {
            data.file = userDataAndFile.file
        }
        dispatch(updateProfile(data))
    }

    // const handleCLoseUpdateDialog = () => {
    //     dispatch(usersFetchStatusSet({[userId]: LOADED}))
    // }

    return (
        <Router>
            {console.log('rendedring profile update')}
            {/* {profileUpdateError && 
                <Alert message={`Oops, Could not update profile. ${profileUpdateError}`} />
            }
            {userFetchStatus === UPDATING && 
                <Alert message={'Updating your information. It will take just a sec...'} closable={false}/>
            }
            {userFetchStatus === UPDATED && 
                <Alert message={'Profile updated!'} onClose={handleCLoseUpdateDialog}/>
            } */}
            {userFetchStatus === LOADED || userFetchStatus === UPDATED
                ?<React.Fragment>
                    <ProfileBackgroundWithAvatar user={user}/>
                    <div className='data-container-update' style={{display: 'flex'}}>
                        <ProfileDataSideBar path={`${props.match.path}`}/>
                        <Switch>
                            <PrivateRoute 
                                path={`${props.match.path}/`} exact 
                                component={General} 
                                additionalProps={{updateProfileData, handleDelete: deleteAvatar}}/>
                            <PrivateRoute 
                                path={`${props.match.path}/additional`} 
                                component={Additional} 
                                additionalProps={{updateProfileData, handleDelete: deleteBackgroundImage}}/>
                            <PrivateRoute 
                                path={`${props.match.path}/security`} 
                                component={ToBeImplemented}/>
                            <PrivateRoute 
                                path={`${props.match.path}/timeline`} 
                                component={ToBeImplemented}/>
                            <PrivateRoute 
                                path={`${props.match.path}/theme`} 
                                component={ToBeImplemented}/>
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </React.Fragment>
                :null
            }
        </Router>
    )
}

export default ProfileUpdate
