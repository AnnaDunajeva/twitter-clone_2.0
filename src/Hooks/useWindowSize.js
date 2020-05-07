import {useState, useEffect} from 'react'

const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    
    const listener = e => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    };

    useEffect(() => {
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);

    return {
        width,
        height
    }
}
export default useWindowSize