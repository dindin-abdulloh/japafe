import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const getEquipmentPart = createAsyncThunk(
  'equipmentPartSlice/getEquipmentPart',
  async ({ page = '1', perPage = '10', token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`equipment?limit=${perPage}&page=${page}`, {
      headers: headers
    })
    return results.data
  }
)

export const addEquomentPart = createAsyncThunk(
  'equipmentPartSlice/addEquomentPart',
  async ({ data = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.post('equipment', data, {
      headers: headers
    })
    return results.data
  }
)

export const editEquipmentPart = createAsyncThunk(
  'equipmentPartSlice/editEquipmentPart',
  async ({ data = null, token = '' }) => {
    const { id, nama, alamat, kota, email, phone, contact_person } = data
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.put(
      `equipment/${id}`,
      {
        nama,
        alamat,
        kota,
        email,
        phone,
        contact_person
      },
      {
        headers: headers
      }
    )
    return results.data
  }
)

export const deleteEquipmentPart = createAsyncThunk(
  'equipmentPartSlice/deleteEquipmentPart',
  async ({ id = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.delete(`equipment/${id}`, {
      headers: headers
    })
    return results.data
  }
)

const initialState = {
  dataEquipmentPart: {
    data: [],
    limit: 0,
    totalData: 0,
    currentPage: 0,
    isLoading: false
  },
  resEquipmentPart: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  }
}

const equipmentPartSlice = createSlice({
  name: 'equipmentPartSlice',
  initialState: initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.resEquipmentPart.success = action.payload
    }
  },
  extraReducers: {
    [getEquipmentPart.pending]: state => {
      state.dataEquipmentPart.isLoading = true
    },
    [getEquipmentPart.fulfilled]: (state, action) => {
    //   console.log('====================================')
    //   console.log(action.payload)
    //   console.log('====================================')
      state.dataEquipmentPart = {
        ...state.dataEquipmentPart,
        data: action.payload.result,
        limit: action.payload.limit,
        totalData: action.payload.totalData,
        currentPage: action.payload.currentPage,
        isLoading: false
      }
    },
    [getEquipmentPart.rejected]: state => {
      state.dataEquipmentPart.isLoading = false
    },

    // addEquomentPart
    [addEquomentPart.pending]: state => {
      state.resEquipmentPart.isLoading = true
    },
    [addEquomentPart.fulfilled]: (state, action) => {
      state.resEquipmentPart = {
        ...state.resEquipmentPart,
        type: 'tambah',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully added data!')
    },
    [addEquomentPart.rejected]: state => {
      state.resEquipmentPart.isLoading = false
      state.resEquipmentPart.success = false
      toast.error('unsuccessfully added data!')
    },

    // editEquipmentPart
    [editEquipmentPart.pending]: state => {
      state.resEquipmentPart.isLoading = true
    },
    [editEquipmentPart.fulfilled]: (state, action) => {
      state.resEquipmentPart = {
        ...state.resEquipmentPart,
        type: 'edit',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
    },
    [editEquipmentPart.rejected]: state => {
      state.resEquipmentPart.success = false
    },

    // deleteEquipmentPart
    [deleteEquipmentPart.pending]: state => {
      state.resEquipmentPart.isLoading = false
      state.resEquipmentPart.isLoading = true
    },
    [deleteEquipmentPart.fulfilled]: (state, action) => {
      state.resEquipmentPart = {
        ...state.resEquipmentPart,
        type: 'remove',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
    },
    [deleteEquipmentPart.rejected]: state => {
      state.resEquipmentPart.isLoading = false
      state.resEquipmentPart.success = false
    }
  }
})

export const { setSuccess } = equipmentPartSlice.actions

export default equipmentPartSlice.reducer
