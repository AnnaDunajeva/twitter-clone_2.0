import { useState, useEffect } from 'react';

const ToTopButton = () => {
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

    return scrollY
};

export default ToTopButton;
