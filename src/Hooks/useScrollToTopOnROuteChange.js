import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollIntoView = () => {
    const location = useLocation()
    const prevLocation = useRef();

    useEffect(() => {
        if (prevLocation.current !== location.pathname) {
            window.scrollTo(0, 0);
            prevLocation.current = location.pathname;
        }
    }, [location]);

        return;
    };
export default useScrollIntoView;

// export default withRouter(ScrollIntoView);
