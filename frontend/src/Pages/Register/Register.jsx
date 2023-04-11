import './Register.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {register, reset} from '../../features/authSlice/authSlice'
import Spinner from '../../Components/Spinner/Spinner'

const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const {name,email,password,password2} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user,isSuccess,isLoading,isError,message }=useSelector((store)=>store.auth)


    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())

    },[user,isSuccess,isLoading,isError,message,navigate,dispatch])




    const onChange =(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
 
    const onSubmit =(e)=>{
        e.preventDefault()
        if(password !== password2){
            toast.error('passwors do not matched')
        }else{
            const userData = {name,email,password}
            console.log(userData)
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner/>
    }


  return (
    <>
    <section className='heading'>
        <h1>
            <FaUser/> Register
        </h1>
        <p>Please create an account</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input className='form-control' type='text' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}/>
            </div>
            <div className='form-group'>
                <input className='form-control' type='email' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
            </div>
            <div className='form-group'>
                <input className='form-control' type='password' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange}/>
            </div>
            <div className='form-group'>
                <input className='form-control' type='password' id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register
