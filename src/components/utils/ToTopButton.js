import React, { useState, useEffect, useRef } from 'react';
import {IoIosArrowUp} from "react-icons/io"

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
            <div style={{position: 'fixed', bottom: '10%', right: '10%'}}>
                <IoIosArrowUp onClick={handleToTop} size={50} className='hover-blue-circle-background clickable hover-blue'/>
            </div>
    );
};

export default ToTopButton;
