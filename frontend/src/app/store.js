import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/authSlice/authSlice';
import taskSliceReducer from '../features/TaskSlice/TaskSlice';
import imageSlice from '../features/imageSlice'

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    tasks: taskSliceReducer,
    img:imageSlice
  },
});
