import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const getCustomer = createAsyncThunk(
  'customerSlice/getCustomer',
  async ({ page = '1', perPage = '10', token = '', search = ''}) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`customer?limit=${perPage}&page=${page}&search=${search}`, {
      headers: headers
    })
    console.log(results);
    return results.data
  }
)

export const getOneCustomer = createAsyncThunk(
  'customerSlice/getOneCustomer',
  async ({ id = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`customer/${id}`, {
      headers: headers
    })
    // console.log('jalan')
    console.log(results);
    return results.data
  }
)

export const addCustomer = createAsyncThunk(
  'customerSlice/addCustomer',
  async ({ data = null, token = '' }) => {
    // console.log(data);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.post('customer', data, {
      headers: headers
    })
    return results.data
  }
)

export const editCustomer = createAsyncThunk(
  'customerSlice/editCustomer',
  async ({ data = null, token = '' }) => {
    const { id, nama, alamat, kota, email, phone, contact_person } = data
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.put(
      `customer/${id}`,
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

export const deleteCustomer = createAsyncThunk(
  'customerSlice/deleteCustomer',
  async ({ id = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.delete(`customer/${id}`, {
      headers: headers
    })
    return results.data
  }
)

const initialState = {
  dataCustomer: {
    data: [],
    limit: 0,
    totalData: 0,
    currentPage: 0,
    isLoading: false
  },
  dataOneCustomer: {
    success: false,
    data: null,
    isLoading: false
  },
  resCustomer: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  }
}

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState: initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.resCustomer.success = action.payload
    },
    setSuccessOneCus: (state, action) => {
      state.dataOneCustomer.success = action.payload
    }
  },
  extraReducers: {
    [getCustomer.pending]: state => {
      state.dataCustomer.isLoading = true
    },
    [getCustomer.fulfilled]: (state, action) => {
      state.dataCustomer = {
        ...state.dataCustomer,
        data: action.payload.result,
        limit: action.payload.limit,
        totalData: action.payload.totalData,
        currentPage: action.payload.currentPage,
        isLoading: false
      }
    },
    [getCustomer.rejected]: state => {
      state.dataCustomer.isLoading = false
    },

    // getOneCustomer
    [getOneCustomer.pending]: state => {
      state.dataOneCustomer.isLoading = true
    },
    [getOneCustomer.fulfilled]: (state, action) => {
      state.dataOneCustomer = {
        ...state.dataOneCustomer,
        data: action.payload.msg,
        success: action.payload.succes,
        isLoading: false
      }
    },
    [getOneCustomer.rejected]: state => {
      state.resCustomer.isLoading = false
      state.resCustomer.success = false
    },

    // addCustomer
    [addCustomer.pending]: state => {
      state.resCustomer.isLoading = true
    },
    [addCustomer.fulfilled]: (state, action) => {
      state.resCustomer = {
        ...state.resCustomer,
        type: 'tambah',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully added data!')
    },
    [addCustomer.rejected]: state => {
      state.resCustomer.isLoading = false
      state.resCustomer.success = false
      toast.error('unsuccessfully added data!')
    },

    // editCustomer
    [editCustomer.pending]: state => {
      state.resCustomer.isLoading = true
    },
    [editCustomer.fulfilled]: (state, action) => {
      state.resCustomer = {
        ...state.resCustomer,
        type: 'edit',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully edit data!')
    },
    [editCustomer.rejected]: state => {
      state.resCustomer.success = false
      toast.error('unsuccessfully edit data!')
    },

    // deleteCustomer
    [deleteCustomer.pending]: state => {
      state.resCustomer.isLoading = false
      state.resCustomer.isLoading = true
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.resCustomer = {
        ...state.resCustomer,
        type: 'remove',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully delete data!')
    },
    [deleteCustomer.rejected]: state => {
      state.resCustomer.isLoading = false
      state.resCustomer.success = false
      toast.error('unsuccessfully delete data!')
    }
  }
})

export const { setSuccess, setSuccessOneCus } = customerSlice.actions

export default customerSlice.reducer
