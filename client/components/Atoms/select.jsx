import React from 'react'

export default function Select({Children,...props}) {
  return (
    <>
    <select {...props} className='w-full bg-bginput rounded focus:outline-none focus:ring focus:ring-violet-300' {...props}>
        {Children}
    </select>
    </>
  )
}
