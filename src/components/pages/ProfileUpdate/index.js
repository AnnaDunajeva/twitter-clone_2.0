import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getUserById, getUserStatusById} from '../../../redux-store-2.0/entities/users/selectors'
import {LOADED, UPDATED} from '../../../redux-store-2.0/constants'
import {getAuthedUserId} from '../../../redux-store-2.0/session/selectors'
import ToBeImplemented from '../../utils/ToBeImplemented'
import PrivateRoute from '../../utils/PrivateRoute'
import NotFound from '../NotFound'
import General from './GeneralUserData'
import Additional from './AdditionalUserData'
import ProfileDataSideBar from './ProfileDataSideBar'
import ProfileBackgroundWithAvatar from '../Profile/ProfileBackgroundWithAvatar'
import Alert from '../../modals/Alert'
import EntityBackgroundContainer from '../../styles/EntityBackgroundContainer'
import UpdateViewContainer from '../../styles/UpdateViewContainer'

const ProfileUpdate = (props) => {
    const userId = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))
    const [formError, setFormError] = useState(null)

    return (
        <Router>
            {formError && <Alert message={formError} onClose={() => setFormError(null)}/>}

            {userFetchStatus === LOADED || userFetchStatus === UPDATED
                ?<React.Fragment>
                    <ProfileBackgroundWithAvatar user={user}/>
                    <UpdateViewContainer>
                        <ProfileDataSideBar path={`${props.match.path}`}/>
                        <EntityBackgroundContainer profile={'true'} padding={'5px 70px'}>
                            <Switch>
                                <PrivateRoute 
                                    path={`${props.match.path}/`} exact 
                                    component={General} 
                                    additionalProps={{setFormError: setFormError}}/>
                                <PrivateRoute 
                                    path={`${props.match.path}/additional`} 
                                    component={Additional} 
                                    additionalProps={{setFormError: setFormError}}/>
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
                    </UpdateViewContainer>
                </React.Fragment>
                :null
            }
        </Router>
    )
}

export default ProfileUpdate
