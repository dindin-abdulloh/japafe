import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const getQuotation = createAsyncThunk(
  'quotationSlice/getQuotation',
  async ({ page = '1', perPage = '10', token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`quotation?limit=${perPage}&page=${page}`, {
      headers: headers
    })
    console.log(results.data)
    return results.data
  }
)

export const addQuotation = createAsyncThunk(
  'quotationSlice/addQuotation',
  async ({ data = null, token = '' }) => {
    const formData = new FormData()
    formData.append('quo_number', data.quo_number)
    formData.append('cus_id', data.cus_id)
    formData.append('address', data.address)
    formData.append('city', data.city)
    formData.append('contact', data.contact)
    formData.append('description', data.description)
    formData.append('tanggal_quo', data.tanggal_quo)
    formData.append('quodesk', JSON.stringify(data.quodesk))
    formData.append('upload', data.upload)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.post('quotation', formData, {
      headers: headers
    })
    return results.data
  }
)

// export const editCustomer = createAsyncThunk(
//   'quotationSlice/editCustomer',
//   async ({ data = null, token = '' }) => {
//     const { id, nama, alamat, kota, email, phone, contact_person } = data
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + token
//     }
//     const results = await axios.put(
//       `quotation/${id}`,
//       {
//         nama,
//         alamat,
//         kota,
//         email,
//         phone,
//         contact_person
//       },
//       {
//         headers: headers
//       }
//     )
//     return results.data
//   }
// )

// export const deleteCustomer = createAsyncThunk(
//   'quotationSlice/deleteCustomer',
//   async ({ id = null, token = '' }) => {
//     console.log('====================================')
//     console.log(token)
//     console.log(id)
//     console.log('====================================')
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + token
//     }
//     const results = await axios.delete(`quotation/${id}`, {
//       headers: headers
//     })
//     return results.data
//   }
// )

const initialState = {
  dataQuotation: {
    data: [],
    limit: 0,
    totalData: 0,
    currentPage: 0,
    isLoading: false
  },
  resQuotation: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  }
}

const quotationSlice = createSlice({
  name: 'quotationSlice',
  initialState: initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.resQuotation.success = action.payload
    }
  },
  extraReducers: {
    [getQuotation.pending]: state => {
      state.dataQuotation.isLoading = true
    },
    [getQuotation.fulfilled]: (state, action) => {
      state.dataQuotation = {
        ...state.dataQuotation,
        data: action.payload.result,
        limit: action.payload.limit,
        totalData: action.payload.totalData,
        currentPage: action.payload.currentPage,
        isLoading: false
      }
    },
    [getQuotation.rejected]: state => {},

    // addQuotation
    [addQuotation.pending]: state => {
      state.resQuotation.isLoading = true
    },
    [addQuotation.fulfilled]: (state, action) => {
      state.resQuotation = {
        ...state.resQuotation,
        type: 'tambah',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success(action.payload.massage)
    },
    [addQuotation.rejected]: (state, action) => {
      state.resQuotation.isLoading = false
      state.resQuotation.success = false
      toast.error(action.payload.massage)
    }

    // editCustomer
    // [editCustomer.pending]: state => {
    //   state.resQuotation.isLoading = true
    // },
    // [editCustomer.fulfilled]: (state, action) => {
    //   state.resQuotation = {
    //     ...state.resQuotation,
    //     type: 'edit',
    //     success: action.payload.success,
    //     massage: action.payload.massage,
    //     isLoading: false
    //   }
    // },
    // [editCustomer.rejected]: state => {},

    // // deleteCustomer
    // [deleteCustomer.pending]: state => {
    //   state.resQuotation.isLoading = true
    // },
    // [deleteCustomer.fulfilled]: (state, action) => {
    //   state.resQuotation = {
    //     ...state.resQuotation,
    //     type: 'remove',
    //     success: action.payload.success,
    //     massage: action.payload.massage,
    //     isLoading: false
    //   }
    // },
    // [deleteCustomer.rejected]: state => {}
  }
})

export const { setSuccess } = quotationSlice.actions

export default quotationSlice.reducer
