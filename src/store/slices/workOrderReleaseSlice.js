import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const getWorkOrderRelease = createAsyncThunk(
  'workOrderReleaseSlice/getWorkOrderRelease',
  async ({ page = '1', perPage = '10', token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`wor?limit=${perPage}&page=${page}`, {
      headers: headers
    })

    return results.data
  }
)

export const addWorkOrderRelease = createAsyncThunk(
  'workOrderReleaseSlice/addWorkOrderRelease',
  async ({ data = null, token = '' }) => {
    const formData = new FormData()
    formData.append('job', data.job)
    formData.append('quotation_id_wor', data.quotation_id_wor)
    formData.append('address', data.address)
    formData.append('tgl_wor', data.tgl_wor)
    formData.append('contact', data.contact)
    formData.append('email', data.email)
    formData.append('subject', data.subject)
    formData.append('job_description', data.job_description)
    formData.append('contrak_spk', data.contrak_spk)
    formData.append('priority_stat', data.priority_stat)
    formData.append('qty', data.qty)
    formData.append('unit', data.unit)
    formData.append('tgl_order', data.tgl_order)
    formData.append('delivery_order', data.delivery_order)
    formData.append('ship_address', data.ship_address)
    formData.append('estimasi_hour', data.estimasi_hour)
    formData.append('equip_id_wor', data.equip_id_wor)
    formData.append('scope_of_work', data.scope_of_work)
    formData.append('nama_cus', data.nama_cus)
    formData.append('kota', data.kota)
    formData.append('nilai_kontrak', data.nilai_kontrak)
    formData.append('partwor', JSON.stringify(data.partwor))
    formData.append('upload', data.upload)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.post('wor', formData, {
      headers: headers
    })
    return results.data
  }
)

export const editWorkOrderRelease = createAsyncThunk(
  'workOrderReleaseSlice/editWorkOrderRelease',
  async ({ data = null, token = '' }) => {
    // const { id, nama, alamat, kota, email, phone, contact_person } = data
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + token
    // }
    // const results = await axios.put(
    //   `customer/${id}`,
    //   {
    //     nama,
    //     alamat,
    //     kota,
    //     email,
    //     phone,
    //     contact_person
    //   },
    //   {
    //     headers: headers
    //   }
    // )
    // return results.data
  }
)

export const deleteWorkOrderRelease = createAsyncThunk(
  'workOrderReleaseSlice/deleteWorkOrderRelease',
  async ({ id = null, token = '' }) => {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + token
    // }
    // const results = await axios.delete(`customer/${id}`, {
    //   headers: headers
    // })
    // return results.data
  }
)

const initialState = {
  dataWorkOrderRelease: {
    data: [],
    limit: 0,
    totalData: 0,
    currentPage: 0,
    isLoading: false
  },
  resWorkOrderRelease: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  },
  valueAksi: null
}

const workOrderReleaseSlice = createSlice({
  name: 'workOrderReleaseSlice',
  initialState: initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.resWorkOrderRelease.success = action.payload
    },
    setValueAksi: (state, action) => {
      state.valueAksi = action.payload
    }
  },
  extraReducers: {
    [getWorkOrderRelease.pending]: state => {
      state.dataWorkOrderRelease.isLoading = true
    },
    [getWorkOrderRelease.fulfilled]: (state, action) => {
      state.dataWorkOrderRelease = {
        ...state.dataWorkOrderRelease,
        data: action.payload.result,
        limit: action.payload.limit,
        totalData: action.payload.totalData,
        currentPage: action.payload.currentPage,
        isLoading: false
      }
    },
    [getWorkOrderRelease.rejected]: state => {
      state.dataWorkOrderRelease.isLoading = false
    },

    // addWorkOrderRelease
    [addWorkOrderRelease.pending]: state => {
      state.resWorkOrderRelease.isLoading = true
    },
    [addWorkOrderRelease.fulfilled]: (state, action) => {
      state.resWorkOrderRelease = {
        ...state.resWorkOrderRelease,
        type: 'tambah',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success(action.payload.massage)
    },
    [addWorkOrderRelease.rejected]: (state, action) => {
      console.log(action.payload);
      state.resWorkOrderRelease.isLoading = false
      state.resWorkOrderRelease.success = false
      toast.error('error')
    },

    // editWorkOrderRelease
    [editWorkOrderRelease.pending]: state => {
      //   state.resWorkOrderRelease.isLoading = true
    },
    [editWorkOrderRelease.fulfilled]: (state, action) => {
      //   state.resWorkOrderRelease = {
      //     ...state.resWorkOrderRelease,
      //     type: 'edit',
      //     success: action.payload.success,
      //     massage: action.payload.massage,
      //     isLoading: false
      //   }
    },
    [editWorkOrderRelease.rejected]: state => {
      //   state.resWorkOrderRelease.success = false
    },

    // deleteWorkOrderRelease
    [deleteWorkOrderRelease.pending]: state => {
      //   state.resWorkOrderRelease.isLoading = false
      //   state.resWorkOrderRelease.isLoading = true
    },
    [deleteWorkOrderRelease.fulfilled]: (state, action) => {
      //   state.resWorkOrderRelease = {
      //     ...state.resWorkOrderRelease,
      //     type: 'remove',
      //     success: action.payload.success,
      //     massage: action.payload.massage,
      //     isLoading: false
      //   }
    },
    [deleteWorkOrderRelease.rejected]: state => {
      //   state.resWorkOrderRelease.isLoading = false
      //   state.resWorkOrderRelease.success = false
    }
  }
})

export const { setSuccess, setValueAksi } = workOrderReleaseSlice.actions

export default workOrderReleaseSlice.reducer
