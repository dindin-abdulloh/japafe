import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const getSupplier = createAsyncThunk(
  'supplierSlice/getSupplier',
  async ({ page = '1', perPage = '10', token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`supplier?limit=${perPage}&page=${page}`, {
      headers: headers
    })
    // console.log('jalan')
    return results.data
  }
)

export const addSupplier = createAsyncThunk(
  'supplierSlice/addSupplier',
  async ({ data = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.post('supplier', data, { headers: headers })
    return results.data
  }
)

export const editSupplier = createAsyncThunk(
  'supplierSlice/editSupplier',
  async ({ data = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const {
      id,
      suplier_type,
      npwp,
      sup_name,
      alamat,
      kota,
      phone,
      email,
      bank_akun,
      akun_name,
      akun_number,
      ppn,
      pph,
      cuskontak
    } = data
    const results = await axios.put(
      `supplier/${id}`,
      {
        suplier_type,
        npwp,
        sup_name,
        alamat,
        kota,
        phone,
        email,
        bank_akun,
        akun_name,
        akun_number,
        ppn,
        pph,
        cuskontak
      },
      { headers: headers }
    )
    return results.data
  }
)

export const deleteSupplier = createAsyncThunk(
  'supplierSlice/deleteSupplier',
  async ({ id = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.delete(`supplier/${id}`, { headers: headers })
    return results.data
  }
)

const initialState = {
  dataSupplier: {
    data: [],
    limit: 0,
    totalData: 0,
    currentPage: 0,
    isLoading: false
  },
  resSupplier: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  }
}

const supplierSlice = createSlice({
  name: 'supplierSlice',
  initialState: initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.resSupplier.success = action.payload
    }
  },
  extraReducers: {
    [getSupplier.pending]: state => {
      state.dataSupplier.isLoading = true
    },
    [getSupplier.fulfilled]: (state, action) => {
      state.dataSupplier = {
        ...state.dataSupplier,
        data: action.payload.result,
        limit: action.payload.limit,
        totalData: action.payload.totalData,
        currentPage: action.payload.currentPage,
        isLoading: false
      }
    },
    [getSupplier.rejected]: state => {
      state.dataSupplier.isLoading = false
    },

    // addSupplier
    [addSupplier.pending]: state => {
      state.resSupplier.isLoading = true
    },
    [addSupplier.fulfilled]: (state, action) => {
      state.resSupplier = {
        ...state.resSupplier,
        type: 'tambah',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success(state.resSupplier.massage)
    },
    [addSupplier.rejected]: state => {
      state.resSupplier.isLoading = false
      state.resSupplier.success = false
      toast.error(state.resSupplier.massage)
    },

    // editSupplier
    [editSupplier.pending]: state => {
      state.resSupplier.isLoading = true
    },
    [editSupplier.fulfilled]: (state, action) => {
      state.resSupplier = {
        ...state.resSupplier,
        type: 'edit',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success(action.payload.massage)
    },
    [editSupplier.rejected]: (state, action) => {
      state.resSupplier.isLoading = false
      state.resSupplier.success = false
      toast.error(action.payload.massage)
    },

    // deleteSupplier
    [deleteSupplier.pending]: state => {
      state.resSupplier.isLoading = true
    },
    [deleteSupplier.fulfilled]: (state, action) => {
      state.resSupplier = {
        ...state.resSupplier,
        type: 'remove',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success(state.resSupplier.massage)
    },
    [deleteSupplier.rejected]: state => {
      state.resSupplier.isLoading = false
      state.resSupplier.success = false
      toast.error(state.resSupplier.massage)
    }
  }
})

export const { setSuccess } = supplierSlice.actions

export default supplierSlice.reducer
