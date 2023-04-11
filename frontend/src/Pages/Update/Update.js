import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {updateTask} from '../../features/TaskSlice/TaskSlice'
import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux'

const Update = () => {
    const location = useLocation()  
    const id = location.pathname.substring(location.pathname.lastIndexOf('/')+1)  

    const [task, setTask] = useState({task:""})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
  const onSubmit =(e)=>{
    e.preventDefault()
    dispatch(updateTask({id,task}))
    navigate('/')
}

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="update">Edit Your Tasks</label>
                <input type="text" name="task" id="task" placeholder='Update Task Details' onChange={(e)=>setTask({...task,[e.target.id]:e.target.value})}/>
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='submit'>Update</button>
            </div>
        </form>
    </section>
  )
}

export default Update