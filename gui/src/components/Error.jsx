import React, { useRef, useEffect } from "react";

function Error({ error, duration, setError }) {
  const errorRef = useRef(null);

  document.addEventListener("click", function(){
    if (errorRef.current) {
      errorRef.current.classList.add("hidden");
      setError(null)
    }
  })


  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.classList.remove("hidden");
      errorRef.current.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "backdrop-blur-md");
    }

    const timeout = setTimeout(() => {
      if (errorRef.current) {
        errorRef.current.classList.add("hidden");
        setError(null)
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [error, duration]);

  return (
    <div role="alert" ref={errorRef} className="hidden">
      <div className="relative bg-bgray-200 border-2 w-80 h-56 border-bgray-100 bg-opacity-70 rounded-lg px-4 py-3">
        <div className="absolute -inset-2 rounded-lg bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-white opacity-50 blur-2xl"></div>
        <h1 className="font-bold text-3xl text-center text-offwhite-200">Error</h1>
        <p className="font-bold text-center self-center text-bgray-150">{error}</p>
      </div>
    </div>
  );
}

export default Error;
