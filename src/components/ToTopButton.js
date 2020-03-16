import React, { UseState } from 'react';
import {IoIosArrowUp} from "react-icons/io"

const ToTopButton = ({ children, location }) => {
  const prevLocation = useRef();

  const handleToTop = () => {
      
  }

  return (
      <IoIosArrowUp onClick={handleToTop}/>
  );
};

export default ToTopButton;
