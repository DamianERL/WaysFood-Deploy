import React from 'react'
export default function Dropdown({isVisible,children,onClose}) {
    if(!isVisible) return null
    const handleClose =(e)=>{
        if(e.target.id === 'wrapper')
        onClose();
    }
  return (
    <>
    <div id="wrapper"
        onClick={handleClose} className="
        fixed flex justify-end  inset-0 ">
        <div className="triangle-up z-40 mt-[84px] mr-[45px] absolute"></div>
        <div className= ' mt-[6rem] mb-[22rem] w-[10rem] mr-[2rem] rounded'>
          <div className='relative   bg-white rounded shadow py-1'>
            {children}
          </div>
        </div>
    </div>
    </>
  )
}
