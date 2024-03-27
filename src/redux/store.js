import { configureStore } from '@reduxjs/toolkit'
import commonreducer from './slicers/CommomSlicer'
export const store = configureStore({
  reducer: {
	common:commonreducer
  },
})