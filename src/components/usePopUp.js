import React, { useState } from "react";

export default function usePopUp({ collapse = true }) {
  const [isCollapse, setIsCollapse] = useState(collapse);
  const [state, setState] = useState(null);

  const handleCollapse = (ev) => {
    if (ev.target === document.querySelector(".popup-wrapper"))
      setIsCollapse(true);
  };

  const popUpHandler = (collapse, state) => {
    setIsCollapse(collapse);
    setState(state);
  };

  const Wrapper = ({ children }) => (
    <div
      className={`${
        isCollapse && "hidden"
      } popup-wrapper fixed top-0 left-0 w-full h-screen z-30 overflow-h-auto bg-black bg-opacity-75`}
      onClick={handleCollapse}>
      {children}
    </div>
  );

  return [Wrapper, state, popUpHandler];
}
