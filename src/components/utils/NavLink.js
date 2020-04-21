import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinkFilter = ({ 
    className, 
    fontsize, 
    margin, 
    circle, 
    hoverOnDark, hoverOnLight, 
    padding,
    primary, blue, secondary,
    small, mediumSmall, medium, large,
    size,
    center,
    scalable,
    shadow,
    disabledMediumLight, disabledLight,
    uppercase,
     ...props 
}) => (
    <NavLink className={className} {...props}/>
  )

export default NavLinkFilter