import { configureStore } from '@reduxjs/toolkit'
import commonreducer from './slicers/CommomSlicer'
import AuthControllers from '../screens/controllers/AuthControllers'
export const store = configureStore({
  reducer: {
	common:commonreducer,
  auth:AuthControllers
  },
})