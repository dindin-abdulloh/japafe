import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const getEmployees = createAsyncThunk(
  'employeeSlice/getEmployees',
  async ({ page = '1', perPage = '10', token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.get(`employe?limit=${perPage}&page=${page}`, {
      headers: headers
    })
    console.log('jalan')
    return results.data
  }
)

export const addEmployee = createAsyncThunk(
  'employeeSlice/addEmployee',
  async ({ data = null, token = '' }) => {
    const formData = new FormData()
    formData.append('NIP', data.NIP)
    formData.append('nickname', data.nickname)
    formData.append('nama_karyawan', data.nama_karyawan)
    formData.append('departement', data.departement)
    formData.append('email', data.email)
    formData.append('alamat', data.alamat)
    formData.append('phone', data.phone)
    formData.append('tmptlahir', data.tmptlahir)
    formData.append('tgllahir', data.tgllahir)
    formData.append('id_card', data.id_card)
    formData.append('karyawan_status', data.karyawan_status)
    formData.append('jenis_kelamin', data.jenis_kelamin)
    formData.append('status', data.status)
    formData.append('kota', data.kota)
    formData.append('starjoin', data.starjoin)
    formData.append('sisa_cuti', data.sisa_cuti)
    formData.append('emppen', JSON.stringify(data.emppen))
    formData.append('emppel', JSON.stringify(data.emppel))

    data.emppel.forEach(item => {
      formData.append('upload', item.upload)
    })

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.post('employe', formData, { headers: headers })
    return results.data
  }
)

export const editEmployee = createAsyncThunk(
  'employeeSlice/editEmployee',
  async ({ data = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const {
      id,
      nip,
      nickname,
      nama_karyawan,
      departement,
      email,
      tmptlahir,
      tgllahir,
      id_card,
      karyawan_status,
      jenis_kelamin,
      status,
      kota,
      starjoin,
      endjoin
    } = data
    const results = await axios.put(
      `employe/${id}`,
      {
        nip,
        nickname,
        nama_karyawan,
        departement,
        email,
        tmptlahir,
        tgllahir,
        id_card,
        karyawan_status,
        jenis_kelamin,
        status,
        kota,
        starjoin,
        endjoin
      },
      { headers: headers }
    )
    return results.data
  }
)

export const deleteEmployee = createAsyncThunk(
  'employeeSlice/deleteEmployee',
  async ({ id = null, token = '' }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
    const results = await axios.delete(`employe/${id}`, { headers: headers })
    return results.data
  }
)

const initialState = {
  dataEmployee: {
    data: [],
    limit: 0,
    totalData: 0,
    currentPage: 0,
    isLoading: false
  },
  resEmployee: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  }
}

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.resEmployee.success = action.payload
    }
  },
  extraReducers: {
    [getEmployees.pending]: state => {
      state.dataEmployee.isLoading = true
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.dataEmployee = {
        ...state.dataEmployee,
        data: action.payload.result,
        limit: action.payload.limit,
        totalData: action.payload.totalData,
        currentPage: action.payload.currentPage,
        isLoading: false
      }
    },
    [getEmployees.rejected]: state => {
      state.dataEmployee.isLoading = false
    },

    // addEmployee
    [addEmployee.pending]: state => {
      state.resEmployee.isLoading = true
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.resEmployee = {
        ...state.resEmployee,
        type: 'tambah',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully added data!')
    },
    [addEmployee.rejected]: state => {
      state.resEmployee.isLoading = false
      state.resEmployee.success = false
      toast.error('unsuccessfully added data!')
    },

    // editEmployee
    [editEmployee.pending]: state => {
      state.resEmployee.isLoading = true
    },
    [editEmployee.fulfilled]: (state, action) => {
      state.resEmployee = {
        ...state.resEmployee,
        type: 'edit',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully edit data!')
    },
    [editEmployee.rejected]: state => {
      state.resEmployee.isLoading = false
      state.resEmployee.success = false
      toast.error('unsuccessfully edit data!')
    },

    // deleteEmployee
    [deleteEmployee.pending]: state => {
      state.resEmployee.isLoading = true
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.resEmployee = {
        ...state.resEmployee,
        type: 'remove',
        success: action.payload.success,
        massage: action.payload.massage,
        isLoading: false
      }
      toast.success('successfully delete data!')
    },
    [deleteEmployee.rejected]: state => {
      state.resEmployee.isLoading = false
      state.resEmployee.success = false
      toast.error('successfully delete data!')
    }
  }
})

export const { setSuccess } = employeeSlice.actions

export default employeeSlice.reducer
