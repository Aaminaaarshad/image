import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    img: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ""
}

export const getImage =createAsyncThunk('imageSlice/getImage',async(_, thunkAPI)=>{
    try {
        const response = await axios.get("https://worried-lion-tunic.cyclic.app/api/task/getAllTasks")
        const data = response.data
        return data
}
 catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


export const createImage =createAsyncThunk('imageSlice/createImage',async({newData,config}, thunkAPI)=>{
    try {
        const response = await axios.post("http://localhost:5000/api/task/createImage",newData,config)
        const data = response.data
        return data
}
 catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


// export const createTask =createAsyncThunk('taskSlice/createTask',async(task, thunkAPI)=>{
//     console.log(task)
//     try {
//         const token = thunkAPI.getState().auth.user.token
//          const config ={
//             headers:{
//                 Authorization: `Bearer ${token}`
//             }
//          }
//         const response = await axios.post("https://worried-lion-tunic.cyclic.app/api/task/createTask",task, config)
//         return response.data
    
       

//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }

// })


export const imageSlice = createSlice({
    name:"img",
    initialState,
    reducers:{
        reset: (state)=> initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getImage.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getImage.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true
            console.log(action);
            state.img = action.payload
        })
        .addCase(getImage.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message
        })

        .addCase(createImage.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(createImage.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true
            console.log(action);
            state.image.push(action.payload)
        })
        .addCase(createImage.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
        })
    }

})
export const {reset}=imageSlice.actions
export default imageSlice.reducer