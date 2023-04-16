import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector ,useDispatch} from 'react-redux'
import TaskForm from "../../Components/TaskForm/TaskForm";
import Spinner from '../../Components/Spinner/Spinner'
import {getAllTask ,reset} from '../../features/TaskSlice/TaskSlice'
import TaskItem from "../../Components/TaskItem/TaskItem";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user }=useSelector((store)=>store.auth)
  const { tasks,isSuccess,isLoading,isError,message}=useSelector((store)=>store.tasks)


  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    dispatch(getAllTask())
    // return ()=>{
    //   dispatch(reset())
    // }
  },[user,navigate,isError,message,dispatch])

if(isLoading){
  return <Spinner/>
}

  return (
    <>
    <section className="heading">
      {/* ////it means if user exist then show its name */}
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      <Link to="/upload">Image</Link>
    </section>
    <TaskForm/>

    <section className="content">
      {tasks.length > 0 ? (
        <div className="goals">
          {tasks.map((task)=>(
            <TaskItem key={task._id} task={task}/>
          ))}
        </div>
      ): tasks.length === 0 ? <h3>No Task Found</h3> :<Spinner/> }
    </section>
    </>
  )
}

export default Dashboard
