import React from 'react'
import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
import {useSelector} from 'react-redux'
import {getUserById, getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {LOADED} from '../redux-store-2.0/constants'
import ProfileDataSideBar from './ProfileDataSideBar'
import ToBeImplemented from './ToBeImplemented'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import General from './GeneralUserData'

const ProfileUpdate = (props) => {
    const userId = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))

    return (
        <Router>
            {console.log('rendedring profile update')}
            {userFetchStatus === LOADED 
                ?<React.Fragment>
                    <ProfileBackgroundWithAvatar user={user}/>
                    <div className='data-container'>
                        <ProfileDataSideBar path={`${props.match.path}`}/>
                        <Switch>
                            <PrivateRoute path={`${props.match.path}/`} exact component={General}/>
                            <PrivateRoute path={`${props.match.path}/additional`} exact component={ToBeImplemented}/>
                            <PrivateRoute path={`${props.match.path}/security`} exact component={ToBeImplemented}/>
                            <PrivateRoute path={`${props.match.path}/timeline`} exact component={ToBeImplemented}/>
                            <PrivateRoute path={`${props.match.path}/theme`} exact component={ToBeImplemented}/>
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
