import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import customerSlice from './slices/customerSlice'
import supplierSlice from './slices/supplierSlice'
import employeeSlice from './slices/employeeSlice'
import quotationSlice from './slices/quotationSlice'
import equipmentPartSlice from './slices/equipmentPartSlice'
import workOrderReleaseSlice from './slices/workOrderReleaseSlice'

const reducer = combineReducers({
  authSlice,
  customerSlice,
  supplierSlice,
  employeeSlice,
  quotationSlice,
  equipmentPartSlice,
  workOrderReleaseSlice
})

const store = configureStore({
  reducer
})

export default store
