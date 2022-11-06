import React from 'react'

export default function Label({id,style,children,...props}) {
  return (
    <label {...props}
    className={`${style
      ? style : "bg-fontPrimary hover:bg-fontPrimary/90"
    } text-white w-9 font-extrabold text-lg `}
     htmlFor={id}
     >
     {children}
      </label>
  )
}
