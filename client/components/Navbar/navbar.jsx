import Image from 'next/image'
import React, { useState } from 'react'
import ModalAuth from '../Modal/modalauth'
import Dropdown from './dropdown'
import Link from 'next/link'

import { UserContext } from '../../app/userContext'
import { useContext } from 'react'
export default function Navbar({setShowMLogin,showMLogin,counter}) {

  const[state,dispatch]=useContext(UserContext)
  


  const isLogin = state.isLogin
  return (
    <>
    <nav className='h-24 py-4 bg-primary z-50 sticky top-0 '>
      <div className='flex justify-between px-10 item-center'>
         <Link  href={state.user.role === "patner" ? "/transaction" :"/"} >
        <div  className='flex cursor-pointer  '>
            <Image src='/WaysFood.svg' width={90} height={38} alt="waysfood" />
            <Image src='/rider.svg'width={48} height={43}  alt='rider'/>
        </div>
        </Link>
        <div className='flex gap-3'>
          {isLogin?(
            <Dropdown counter={counter} />
            ):(
              <ModalAuth setShowMLogin={setShowMLogin} showMLogin={showMLogin} />
          )}
        </div>
      </div>
    </nav>
    </>
  )
  }
