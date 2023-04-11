import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    tasks: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ""
}

export const getAllTask =createAsyncThunk('taskSlice/getAllTask',async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
         const config ={
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get("https://agile-crab-tux.cyclic.app/api/task/getAllTasks",config)
        const data = response.data
        return data

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


export const createTask =createAsyncThunk('taskSlice/createTask',async(task, thunkAPI)=>{
    console.log(task)
    try {
        const token = thunkAPI.getState().auth.user.token
         const config ={
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
        const response = await axios.post("https://agile-crab-tux.cyclic.app/api/task/createTask",task, config)
        return response.data
    
       

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const deleteTask =createAsyncThunk('taskSlice/deleteTask',async(id, thunkAPI)=>{

    try {
        const token = thunkAPI.getState().auth.user.token
         const config ={
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
        const response = await axios.delete(`https://agile-crab-tux.cyclic.app/api/task/deleteTask/${id}`, config)
        return response.data
    
       

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


export const updateTask =createAsyncThunk('taskSlice/updateTask',async({id,task}, thunkAPI)=>{
    console.log(task)
    try {
        const token = thunkAPI.getState().auth.user.token
         const config ={
            headers:{
                Authorization: `Bearer ${token}`
            }
         }
        const response = await axios.patch(`https://agile-crab-tux.cyclic.app/api/task/updateTask/${id}`,task,config)
        const data = response.data
        console.log(response);
        return data

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        reset: (state)=> initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createTask.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true
            console.log(action);
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message
        })
        .addCase(getAllTask.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllTask.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true
            state.tasks=action.payload //////right hand side's allTask is from backend
            state.message=action.payload.message
        })
        .addCase(getAllTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message
        })
        .addCase(deleteTask.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            console.log(action.payload);
            console.log(action.payload.deletedTask._id);
            state.isLoading=false;
            state.isSuccess=true
            state.tasks = state.tasks.filter((task)=> task._id !== action.payload.deletedTask._id)
            // state.tasks = action.payload
        })
        .addCase(deleteTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message
        })
        .addCase(updateTask.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.isLoading=false;
            state.isSuccess=true
            state.tasks=action.payload
        })
        .addCase(updateTask.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload.message
        })
    }

})
export const {reset}=taskSlice.actions
export default taskSlice.reducer