import React, { useState } from 'react'

import Button from '../Atoms/button'
import Modal from '../Atoms/modal';

import Login from './login';
import Register from './register';

import { useContext } from 'react';
import { UserContext } from '../../app/userContext';
export default function ModalAuth({showMLogin,setShowMLogin}) {
  const [state,dispatch]=useContext(UserContext)
  const [showModal,setShowModal]= useState(false)


  // switch modal
  const handleCloseRegis =()=>{
    setShowMLogin(false)
    setShowModal(true)
  }
  const handleCloseLog =()=>{
    setShowMLogin(true)
    setShowModal(false)
  }


  return (
    <>
    <Button style="py-2 px-6 bg-fontPrimary hover:bg-fontPrimary/90 " onClick={()=>setShowModal(true)}> Register</Button>
    <Modal  isVisible={showModal} onClose={()=>setShowModal(false)}  >
      <Register/>
        <p className='  text-base text-center mb-8' >Already have an account ? click <strong onClick={handleCloseLog} > HERE</strong></p>
    </Modal>
    <Button style="py-2 px-6 bg-fontPrimary hover:bg-fontPrimary/90" onClick={()=> setShowMLogin(true)}>Login</Button>
    <Modal c  isVisible={showMLogin} onClose={()=>setShowMLogin(false)} >
      <Login/>
      <p className=' text-base text-center mb-8' >Don't have an account? click<strong  onClick={handleCloseRegis} > HERE</strong></p>
    </Modal>
    </>
  )
}
