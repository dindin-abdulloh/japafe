import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const signIn = createAsyncThunk('authSlice/signIn', async data => {
  const results = await axios.post(`signin`, data)
  console.log(results)
  return results.data
})

export const signUp = createAsyncThunk('authSlice/signUp', async data => {
  const results = await axios.post(`signup`, data)
  console.log(results)
  return results.data
})

const initialState = {
  dataSignIn: {
    username: '',
    role_name: '',
    acces_token: '',
    auth: false,
    isLoading: false
  },
  resAuth: {
    type: '',
    success: false,
    massage: '',
    isLoading: false
  }
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.dataSignIn.auth = action.payload
    }
  },
  extraReducers: {
    [signIn.pending]: state => {
      state.dataSignIn.isLoading = true
    },
    [signIn.fulfilled]: (state, action) => {
      state.dataSignIn = {
        ...state.dataSignIn,
        auth: action.payload.msg,
        username: action.payload.result.username,
        role_name: action.payload.result.role_name,
        acces_token: action.payload.result.session.acces_token,
        isLoading: false
      }
      sessionStorage.setItem('token', action.payload.result.session.acces_token)
      sessionStorage.setItem('auth', action.payload.msg)
    },
    [signIn.rejected]: state => {
      state.dataSignIn.isLoading = false
      toast.error('unsuccessfully login!')
    },
    //signUp
    [signUp.pending]: state => {
      // state.dataSignIn.isLoading = true
    },
    [signUp.fulfilled]: (state, action) => {
      // state.dataSignIn = {
      //   ...state.dataSignIn,
      //   msg: action.payload.msg,
      //   username: action.payload.result.username,
      //   role_name: action.payload.result.role_name,
      //   acces_token: action.payload.result.session.acces_token,
      //   isLoading: false
      // }
      // sessionStorage.setItem('token', action.payload.result.session.acces_token)
      // sessionStorage.setItem('auth', action.payload.msg)
    },
    [signUp.rejected]: state => {}
  }
})
export const { setAuth } = authSlice.actions

export default authSlice.reducer
