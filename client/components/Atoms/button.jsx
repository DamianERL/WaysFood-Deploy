import React from "react";

export default function Button({ style, children, ...props }) {
  return (
    <button {...props}
      className={`${style 
        ? style : ' bg-fontPrimary hover:bg-fontPrimary/90 ' 
      } text-white  w-full  text-xs font-bold transition duration-300 rounded`}
    >
      {children}
    </button>
    
  );
}
