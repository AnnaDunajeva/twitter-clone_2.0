import React, { useState, useEffect, useRef } from 'react';
import {IoIosArrowUp} from "react-icons/io"
import IconButton from '../styles/IconButton'

const ToTopButton = () => {
    const [showButton, setShowButton] = useState(false)
    const windowHeight = useRef(window.innerHeight)
    const [scrollY, setScrollY] = useState(window.scrollY);

    const listener = e => {
        setScrollY(window.scrollY);
    };
    
    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    useEffect(() => {
        if (scrollY > windowHeight.current && !showButton) {
            console.log('setting showbutton to true ', scrollY, windowHeight.current)
            setShowButton(true)
        } else if (scrollY < windowHeight.current && showButton) {
            setShowButton(false)
        }
    }, [scrollY, showButton])

    const handleToTop = () => {
        window.scrollTo(0, 0);
        setShowButton(false)
        setScrollY(window.scrollY);
    } 

    return (
        showButton && 
            <IconButton 
                onClick={handleToTop}
                circle size={'45px'}
                style={{position: 'fixed', bottom: '8%', right: '8%'}}>
                    <IoIosArrowUp size={40}/>
            </IconButton>
    );
};

export default ToTopButton;
