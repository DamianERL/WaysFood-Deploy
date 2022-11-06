//integrasi
import { useMutation } from "react-query";
import { API } from "../../config/api";
import swal from 'sweetalert';

//component
import Input from '../Atoms/input';
import Button from '../Atoms/button';

//import
import { useContext, useState } from 'react';
import { UserContext } from '../../app/userContext';
import { useRouter } from "next/dist/client/router";


export default function Register() {
  const router = useRouter()
  const [state, dispatch] = useContext(UserContext);

    const [input,setInput]= useState("")
    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
    };


    const handleRegister =useMutation(async(e)=>{
      try {
        e.preventDefault()
        
  
        
        const body = JSON.stringify(input)
      
        await API.post("/register",body)

        swal("Register Success")
      } catch (error) {
        console.log(error)
      }
    })


  return (
    <>
          <div className='p-8'>
        <p className='text-primary font-bold text-4xl mt-1 mb-10 '>Register</p>
        <form onSubmit={(e)=>handleRegister.mutate(e)} className='flex flex-col justify-center item-center'>
        <div className='w-[22rem]'>
        <Input onChange={handleChange} placeholder='EMAIL'  type='email' name="email" />
        <Input onChange={handleChange} placeholder='FULLNAME' name="name" type="text" />
        <Input onChange={handleChange} placeholder='PASSWORD' type="password" name="password" />
        <Input onChange={handleChange} placeholder='GENDER' type="text" name="gender" />
        <Input onChange={handleChange} placeholder='PHONE'name="phone" type="number" />
        <select className=' p-0 mb-3 px-4 py-2 w-full bg-bginput rounded focus:outline-none focus:ring focus:ring-violet-300' 
        name="role" onChange={handleChange} >
          <option  hidden></option>
          <option value="customer"> AS USER</option>
          <option value="patner"> AS PATNER</option>
        </select>
        </div>
        <Button  style='h-10 mt-5  bg-fontPrimary hover:bg-fontPrimary/90'>login</Button>
        </form>
      </div>
    </>
  )
}
