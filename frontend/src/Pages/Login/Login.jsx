import './Login.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {login, reset} from '../../features/authSlice/authSlice'
import Spinner from '../../Components/Spinner/Spinner'

const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    const {email,password} = formData
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
        const userData = {email,password}
        dispatch(login(userData))
    }


    if(isLoading){
        return <Spinner/>
    }

  return (
    <>
    <section className='heading'>
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Login and start setting tasks</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input className='form-control' type='email' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
            </div>
            <div className='form-group'>
                <input className='form-control' type='password' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login
