import { configureStore } from '@reduxjs/toolkit'
import commonreducer from './slicers/CommomSlicer'
import AuthControllers from '../screens/controllers/AuthControllers'
import OccassionController from '../screens/controllers/OccassionController'
import CuisineController from '../screens/controllers/CuisineController'
import PackageController from '../screens/controllers/PackageController'
import ProfileController from '../screens/controllers/ProfileController'
import BranchController from '../screens/controllers/BranchController'
import PhotoController from '../screens/controllers/PhotoController'
import ReviewController from '../screens/controllers/ReviewController'
import InquiryController from '../screens/controllers/InquiryController'
import SettingsController from '../screens/controllers/SettingsController'
import SubscriptionController from '../screens/controllers/SubscriptionController'
export const store = configureStore({
  reducer: {
	common:commonreducer,
  auth:AuthControllers,
  occassion:OccassionController,
  cuisine:CuisineController,
  package:PackageController,
  profile:ProfileController,
  branch:BranchController,
  photo:PhotoController,
  review:ReviewController,
  inquiry:InquiryController,
  settings:SettingsController,
  subscription:SubscriptionController
  },
})