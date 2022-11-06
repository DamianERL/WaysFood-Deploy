import React from 'react'

export default function Modal({isVisible,style,children,onClose}) {
  if( !isVisible) return null
  const handlclose =(e)=>{
    if (e.target.id === 'wrapper')
    onClose();
  }
  return (
    <div  id="wrapper"
     onClick={handlclose} className=" z-50
     fixed flex justify-center items-center inset-0 bg-black/25">
      <div className= 'rounded  bg-white'>
        {children}
      </div>
    </div>
  )
}
