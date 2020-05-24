import React, {useState, useEffect} from 'react'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import NavLink from '../../utils/NavLink'
import UpdateProfileSidebar from '../../styles/UpdateProfileSidebar'
import {MdDehaze} from 'react-icons/md'
import IconButton from '../../styles/IconButton'
import useWindowSize from '../../../Hooks/useWindowSize'

const ProfileDataSideBar = ({path}) => { 
    const {width} = useWindowSize()   
    const [showMenu, setShowMenu] = useState(width > 500 ? true : false)

    const toggleMenu = () => {
        if (width < 501) {
            setShowMenu(!showMenu)
        }
    }
    useEffect(() => {
        if (width > 500 && !showMenu) {
            setShowMenu(true)
        }
    }, [width, showMenu])

    return (
        <React.Fragment>
        {width < 501 &&
        <UpdateProfileSidebar mobile>
            <IconButton 
                onClick={toggleMenu}
                circle size={'35px'} margin={'0 auto'}>
                <MdDehaze size={27}/>
            </IconButton>
        </UpdateProfileSidebar>
        }
        <TransitionGroup component={null}>
        {showMenu &&
            <CSSTransition
                timeout={200}
                appear={true}
                classNames='item'>
                <UpdateProfileSidebar onClick={toggleMenu}>
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
            </CSSTransition>
        } 
        </TransitionGroup>
        </React.Fragment>
    )
}

export default ProfileDataSideBar

