import React, { useState, useEffect, useRef } from 'react';
import {IoIosArrowUp} from "react-icons/io"
import ToTopButtonStyle from '../styles/ToTopButton'
import useScrollY from '../../Hooks/useScrollY'

const ToTopButton = () => {
    const [showButton, setShowButton] = useState(false)
    const windowHeight = useRef(window.innerHeight)
    const scrollY = useScrollY()

    useEffect(() => {
        if (scrollY > windowHeight.current && !showButton) {
            setShowButton(true)
        } else if (scrollY < windowHeight.current && showButton) {
            setShowButton(false)
        }
    }, [scrollY, showButton])

    const handleToTop = () => {
        window.scrollTo(0, 0);
        setShowButton(false)
    } 

    return (
        showButton && 
            <ToTopButtonStyle 
                onClick={handleToTop}
                circle size={'45px'}>
                    <IoIosArrowUp size={40}/>
            </ToTopButtonStyle>
    );
};

export default ToTopButton;
