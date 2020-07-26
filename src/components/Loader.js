import React, { useState, useEffect } from "react";

export default function Loader() {
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadTime((currTime) => currTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loadTime < 3)
    return (
      <div className="fixed top-0 left-0 flex w-full justify-center items-center h-full z-40 text-5xl text-yellow-400">
        <i className="fas fa-circle-notch transform loader rotate-45 opacity-25"></i>
      </div>
    );

  return (
    <div className="fixed top-0 left-0 flex w-full justify-center items-center bg-black bg-opacity-75 h-full z-40 text-5xl text-yellow-500">
      <i className="fas fa-spinner loader transform rotate-45"></i>
    </div>
  );
}
