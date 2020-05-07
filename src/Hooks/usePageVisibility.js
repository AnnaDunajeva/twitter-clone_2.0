    import { useEffect, useState } from 'react'
    
    let hidden; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        hidden = "hidden";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
    }
    
    const usePageVisibility = () => {
        const [pageVisible, setPageVisibile] = useState(!document[hidden])
        
        const handleVisibilityChange = () => {
            if (document[hidden]) {
                console.log('documment is hidden')
                setPageVisibile(false)
            } else {
                console.log('documment is visible')
                setPageVisibile(true)
            }
        }
      
        useEffect(() => {
            document.addEventListener("visibilitychange", handleVisibilityChange);
            return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
        }, [])

        return pageVisible
    }
    
    export default usePageVisibility
    
    
    