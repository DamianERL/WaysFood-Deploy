import React from 'react'

export default function Input({ clas,style,children,...props}) {
  return (
    <div>
      <input {...props} className={`${style ? style: ""}
    }  mb-3 px-4 py-2 w-full bg-bginput rounded focus:outline-none focus:ring focus:ring-violet-300`}/>{children}
    </div>
  )
}
