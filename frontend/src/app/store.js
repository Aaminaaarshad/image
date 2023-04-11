import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/authSlice/authSlice';
import taskSliceReducer from '../features/TaskSlice/TaskSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    tasks: taskSliceReducer
  },
});
