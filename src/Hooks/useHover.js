import React from "react";

const useHover = () => {
    const [hovering, setHovering] = React.useState(false);
    const mouseIn = () => {
        setHovering(true);
    };
    const mouseOut = () => {
        setHovering(false);
    };
    const attrs = {
        onMouseOver: mouseIn,
        onMouseOut: mouseOut
    };
    return { hovering, ...attrs };
};
export default useHover;
