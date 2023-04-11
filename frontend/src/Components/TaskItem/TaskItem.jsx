import { useDispatch } from "react-redux"
import {deleteTask ,getAllTask} from '../../features/TaskSlice/TaskSlice'
import { useNavigate } from "react-router-dom";
import {GrEdit} from 'react-icons/gr'


const TaskItem = ({task}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const clickDelete =(id)=>{
    dispatch(deleteTask(id))
    dispatch(getAllTask())
  }

  return (
    <div className="goal">
      <div>
        {new Date(task.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{task.task}</h2>
      <div className="taskButton">
        <button onClick={()=>(clickDelete(task._id))} className="close">X</button>
        <button onClick={()=>navigate(`/update/${task._id}`)} className="edit"><GrEdit/></button>
      </div>
      
    </div>
  )
}

export default TaskItem
