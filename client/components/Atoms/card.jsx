import React from "react";

export default function Card({ children }) {
  return (
    <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-main/50  active:bg-main/70 cursor-pointer'>
      {children}
    </div>
  );
}
