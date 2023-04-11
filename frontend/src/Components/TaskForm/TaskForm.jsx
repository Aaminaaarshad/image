import { useState } from "react"
import { useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {createTask} from '../../features/TaskSlice/TaskSlice'

const TaskForm = () => {
    const [task, setTask] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit =(e)=>{
        e.preventDefault()
        dispatch(createTask({task}))
        setTask('')
    }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="task">Enter your tasks</label>
            <input type="text" placeholder='Enter Task Details' name="task" value={task} onChange={(e)=>setTask(e.target.value)}/>
        </div>
        <div className="form-group">
            <button className="btn btn-block" type="submit">Add Goal</button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
