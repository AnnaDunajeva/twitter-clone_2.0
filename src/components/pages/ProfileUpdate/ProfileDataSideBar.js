import React from 'react'
import NavLink from '../../utils/NavLink'
import UpdateProfileSidebar from '../../styles/UpdateProfileSidebar'

const ProfileDataSideBar = ({path}) => {    
    return (
        <UpdateProfileSidebar>
            <NavLink to={`${path}/`} exact>
                General Informatiom
            </NavLink>

            <NavLink to={`${path}/additional`}>
                Additional Informatiom
            </NavLink>

            <NavLink to={`${path}/security`}>
                Security
            </NavLink>

            <NavLink to={`${path}/timeline`}>
                Timeline
            </NavLink>

            <NavLink to={`${path}/theme`}>
                Theme and Styles
            </NavLink>
        </UpdateProfileSidebar>
    )
}

export default ProfileDataSideBar

