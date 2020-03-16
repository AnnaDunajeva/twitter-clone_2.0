import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileDataSideBar = ({path}) => {    
    return (
        <div className='profile-meta profile-sidebar' style={{width: '330px'}}>
            <NavLink to={`${path}/`} exact activeClassName='active profile-sidebar-link-active' className='profile-sidebar-link'>
                General Informatiom
            </NavLink>

            <NavLink to={`${path}/additional`} activeClassName='active profile-sidebar-link-active' className='profile-sidebar-link'>
                Additional Informatiom
            </NavLink>

            <NavLink to={`${path}/security`} activeClassName='active profile-sidebar-link-active' className='profile-sidebar-link'>
                Security
            </NavLink>

            <NavLink to={`${path}/timeline`} activeClassName='active profile-sidebar-link-active' className='profile-sidebar-link'>
                Timeline
            </NavLink>

            <NavLink to={`${path}/theme`} activeClassName='active profile-sidebar-link-active' className='profile-sidebar-link'>
                Theme and Styles
            </NavLink>

        </div>
    )
}

export default ProfileDataSideBar

