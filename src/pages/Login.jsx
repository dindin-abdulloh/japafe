import React, { useEffect, useState } from 'react'
import { MdRemoveRedEye, MdPerson, MdVpnKey } from 'react-icons/md'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/slices/authSlice'
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const { username, role_name, acces_token, auth, isLoading } = useSelector(
    state => state.authSlice.dataSignIn
  )
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''

    },
    onSubmit: (values) => {
      dispatch(signIn(values))
      // navigate("/", { replace: true })
      // sessionStorage.setItem('auth', true)
    }
  })

  const showPassword = () => {
    setIsShowPass(!isShowPass)
  }

  useEffect(() => {
    if (auth) {
      navigate("/", {
        replace: true,
        state: { title: '', subtitle: '' }
      })
    }
  }, [auth])

  useEffect(() => {
    console.log('====================================');
    console.log(isShowPass);
    console.log('====================================');
  })

  return (
    <>
      <div className='tw-flex tw-justify-center tw-h-screen tw-items-center'>
        <div className='tw-bg-white tw-w-80 tw-p-6 tw-rounded-lg tw-border'>
          <div className='tw-bg-white tw-p-3 tw-w-full tw-flex tw-justify-center tw-mb-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlSpace='preserve'
              width={120}
              height={30}
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd'
              }}
            >
              <path
                style={{
                  fill: 'none'
                }}
                d='M0 5.26h119.99v19.46H0z'
              />
              <path
                d='M4.03 23.43c2.27.77 5.92 1.27 10.01 1.27 1.11 0 2.19-.04 3.22-.1 3.91-.26 7.05-.99 8.44-1.94V6.55h3V5.24H14.27v1.31h2.99v16.92c-.96.23-2.05.36-3.22.36-1.23 0-2.4-.15-3.4-.4h.14v-3.67h3.64v-1.3H0v1.3h2.34v2.88c.4.3.98.56 1.69.79zm102.45-5.84h-7.39l3.85-9.89 3.54 9.89zm-6.61 5.84h-3.09l1.79-4.53h8.39l1.62 4.53h-2.99v1.33H120v-1.33h-2.86l-6.05-16.88-.47-1.31h-8.92l-.52 1.31-6.61 16.88h-3.13v1.33h8.43v-1.33zm-39.29 0v1.33h14.4v-1.33h-2.94V16.5h7.24c.23-.02.48-.02.71-.04 2.27-.13 4.36-.52 6.09-1.09.89-.29 1.67-.64 2.34-1V7.39c-.67-.36-1.44-.69-2.3-.97-1.73-.58-3.84-.99-6.13-1.12-.59-.04-1.21-.06-1.84-.06H60.62v1.31h2.99v16.88h-3.03zM79.99 6.62v8.49c-1.21.29-2.38.45-3.63.45-1.18 0-2.32-.14-3.36-.39a6.2 6.2 0 0 1-.96-.27V6.82c.31-.1.64-.17.96-.27 1.04-.23 2.18-.37 3.36-.37 1.25 0 2.42.16 3.63.44zm-34.7 10.97h-7.42l3.87-9.89 3.55 9.89zm-6.61 5.84h-3.09l1.76-4.53h8.4l1.63 4.53h-3v1.33h14.41v-1.33h-2.86L49.9 6.55l-.48-1.31H40.49l-.5 1.31-6.61 16.88h-3.13v1.33h8.43v-1.33z'
                style={{
                  fill: 'rgb(239 68 68)'
                }}
              />
            </svg>
          </div>
          <div className='tw-mb-3 tw-form-group'>
            <label
              htmlFor='exampleInputEmail2'
              className='tw-form-label tw-text-sm tw-font-medium tw-inline-block tw-mb-2 tw-text-gray-700'
            >
              Username
            </label>
            <div className='tw-relative'>
              <input
                onChange={formik.handleChange}
                value={formik.values.username}
                type='text'
                className='tw-form-control tw-block tw-w-full tw-pl-11 tw-pr-3 tw-py-2 tw-text-base tw-font-normal tw-text-gray-700  tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                id='username'
                placeholder='Username'
              />
              <div className='tw-absolute tw-left-3 tw-top-2 tw-p-1'>
                <MdPerson size={18} />
              </div>
            </div>
          </div>
          <div className='tw-mb-3 tw-form-group'>
            <label
              htmlFor='exampleInputEmail2'
              className='tw-form-label tw-text-sm tw-font-medium tw-inline-block tw-mb-2 tw-text-gray-700'
            >
              Password
            </label>
            <div className='tw-relative'>
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                type={`${isShowPass ? 'text' : 'password'}`}
                className={`tw-form-control tw-block tw-w-full tw-pl-11 tw-pr-3 tw-py-2 tw-text-base tw-font-normal tw-text-gray-700  tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                id='password'
                placeholder='Password'
              />
              <div className='tw-absolute tw-left-3 tw-top-2 tw-p-1'>
                <MdVpnKey size={18} />
              </div>
              <button onClick={showPassword} className={`${isShowPass ? 'tw-opacity-50' : 'tw-opacity-100'} tw-absolute tw-right-3 tw-top-2 hover:tw-bg-gray-200 tw-p-1 tw-rounded-full tw-transition tw-duration-300 tw-ease-in-out`}>
                <MdRemoveRedEye size={18} />
              </button>
            </div>
          </div>
          {/* <div className='tw-mb-3 xl:tw-w-96'>
            <select
              className='tw-form-select tw-appearance-none tw-block tw-w-full tw-px-3 tw-py-2 tw-text-base tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-bg-no-repeat tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
              aria-label='Default select example'
            >
              <option selected disabled>
                Hak Akses
              </option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </select>
          </div> */}
          {/* <div className='tw-flex tw-justify-end tw-text-sm'>
            <button type='button' className='tw-text-sky-500 hover:tw-underline'>
              Forget Password
            </button>
          </div> */}
          <div className='tw-mt-8 tw-mb-3'>
            <button
              onClick={formik.handleSubmit}
              type='button'
              className='hover:tw-bg-red-600 tw-inline-block tw-w-full tw-px-3 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-base tw-rounded tw-duration-300 tw-ease-in-out'
            >
              {
                isLoading &&
                <div className="spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2" role="status">
                  <span className="tw-visually-hidden">Loading...</span>
                </div>
              }
              Login
            </button>
          </div>
        </div>
        <ToastContainer
          autoClose={5000}
          collapseDuration={300}
          draggable={false}
          hideProgressBar={true}
          theme={'colored'}
        />
      </div>
    </>
  )
}

export default Login
