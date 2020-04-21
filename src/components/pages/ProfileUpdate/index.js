import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getUserById, getUserStatusById} from '../../../redux-store-2.0/entities/users/selectors'
import {updateProfile} from '../../../redux-store-2.0/api/users'
import {deleteAvatar} from '../../../redux-store-2.0/api/users'
import {deleteBackgroundImage} from '../../../redux-store-2.0/api/users'
import {LOADED, UPDATED} from '../../../redux-store-2.0/constants'
import {getUserIdFromCookie} from '../../../utils/helpers'
import ToBeImplemented from '../../utils/ToBeImplemented'
import PrivateRoute from '../../utils/PrivateRoute'
import NotFound from '../NotFound'
import General from './GeneralUserData'
import Additional from './AdditionalUserData'
import ProfileDataSideBar from './ProfileDataSideBar'
import ProfileBackgroundWithAvatar from '../Profile/ProfileBackgroundWithAvatar'
import Alert from '../../modals/Alert'
import EntityBackgroundContainer from '../../styles/EntityBackgroundContainer'

const ProfileUpdate = (props) => {
    const userId = getUserIdFromCookie()
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))
    const dispatch = useDispatch()
    const [formError, setFormError] = useState(null)

    const updateProfileData = (userDataAndFile) => {
        const data = {
            userData: userDataAndFile.user
        }
        if (userDataAndFile.file) {
            data.file = userDataAndFile.file
        }
        dispatch(updateProfile(data))
    }

    return (
        <Router>
            {console.log('rendedring profile update')}

            {formError && <Alert message={formError} onClose={() => setFormError(null)}/>}

            {userFetchStatus === LOADED || userFetchStatus === UPDATED
                ?<React.Fragment>
                    <ProfileBackgroundWithAvatar user={user}/>
                    <div style={{display: 'flex'}}>
                        <ProfileDataSideBar path={`${props.match.path}`}/>
                        <EntityBackgroundContainer profile={'true'} padding={'20px 100px'}>
                            <Switch>
                                <PrivateRoute 
                                    path={`${props.match.path}/`} exact 
                                    component={General} 
                                    additionalProps={{updateProfileData, handleDelete: deleteAvatar, setFormError: setFormError}}/>
                                <PrivateRoute 
                                    path={`${props.match.path}/additional`} 
                                    component={Additional} 
                                    additionalProps={{updateProfileData, handleDelete: deleteBackgroundImage, setFormError: setFormError}}/>
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
                        </EntityBackgroundContainer>
                    </div>
                </React.Fragment>
                :null
            }
        </Router>
    )
}

export default ProfileUpdate
