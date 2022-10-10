import React, { useEffect, useState, useRef } from 'react'
import MyDatePicker from '../data_picker/MyDatePicker'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { editEmployee, getEmployees } from '../../store/slices/employeeSlice'
import isObjEqual from '../../utils/isObjEqual'
import { MdDelete } from 'react-icons/md'
import moment from 'moment'

const ModalEdit = ({ valAksi, token }) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const { success, isLoading, type } = useSelector(state => state.employeeSlice.resEmployee)
  const modalRef = useRef(null)
  const [lastEdu, setLastEdu] = useState({
    status: '',
    desc: '',
    date: ''
  })
  const [lastEduList, setLastEduList] = useState([])

  const onChangeLastEdu = (name, value) => {
    setLastEdu(lastEdu => ({
      ...lastEdu,
      [name]: value
    }))
  }
  const saveLastEdu = () => {
    setLastEduList(lastEduList => [...lastEduList, lastEdu])
    setLastEdu(lastEdu => ({
      ...lastEdu,
      status: '',
      desc: '',
      date: ''
    }))
    setTimeout(() => {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }, 10);
  }

  const removeLastEdu = (idx) => {
    setLastEduList((lastEduList) => [
      ...lastEduList.slice(0, idx),
      ...lastEduList.slice(idx + 1, lastEduList.length)
    ]);
  }

  const formik = useFormik({
    initialValues: {
      id: '',
      nip: '',
      nickname: '',
      nama_karyawan: '',
      departement: '',
      email: '',
      tmptlahir: '',
      tgllahir: '',
      id_card: '',
      karyawan_status: '',
      jenis_kelamin: '',
      status: '',
      kota: '',
      starjoin: '',
      endjoin: ''

    },
    validationSchema: Yup.object({
      nip: Yup.number().required('NIP is required'),
      nickname: Yup.string().required('Nickname is required'),
      nama_karyawan: Yup.string().required('Employee name is required'),
      departement: Yup.string().required('Department is required'),
      email: Yup.string().email('Must be a valid email').required('Email is required'),
      tmptlahir: Yup.string().required('Birth place is required'),
      tgllahir: Yup.string().required('Birth date is required'),
      id_card: Yup.number().required('ID Card is required'),
      karyawan_status: Yup.string().required('Employee status is required'),
      jenis_kelamin: Yup.string().required('Gender status is required'),
      status: Yup.string().required('Maritial status status is required'),
      kota: Yup.string().required('City person is required'),
      starjoin: Yup.string().required('Start joining person is required'),
      endjoin: Yup.string().required('Remaining days off person is required'),
    }),
    onSubmit: (values) => {
      console.log(valAksi);
      console.log(values);
      dispatch(editEmployee({ data: values, token: token }))
    }
  })

  useEffect(() => {
    formik.setValues((values) => (
      {
        ...values,
        id: valAksi.id,
        nip: valAksi.nip,
        nickname: valAksi.nickname,
        nama_karyawan: valAksi.nama_karyawan,
        departement: valAksi.departement,
        email: valAksi.email,
        tmptlahir: valAksi.tmptlahir,
        tgllahir: moment(valAksi.tgllahir).format('M/DD/YYYY'),
        id_card: valAksi.id_card,
        karyawan_status: valAksi.karyawan_status,
        jenis_kelamin: valAksi.jenis_kelamin,
        status: valAksi.status,
        kota: valAksi.kota,
        starjoin: moment(valAksi.starjoin).format('M/DD/YYYY'),
        endjoin: moment(valAksi.endjoin).format('M/DD/YYYY'),
      }
    ))
  }, [valAksi])

  useEffect(() => {
    setIsEdit(isObjEqual(valAksi, formik.values))
  }, [formik.values])

  useEffect(() => {
    if (success) {
      if (type === 'edit') {
        const modal = window.Modal.getInstance(document.querySelector('#edit'))
        modal.hide()
        formik.resetForm({ values: '' })
        dispatch(getEmployees({ token: token }))
      }
    }
  }, [success])

  return (
    <React.Fragment>
      <div
        className='modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto'
        id='edit'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='detail'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Edit Employee
              </h5>
              <button
                onClick={() => {
                  formik.resetForm({ values: '' })
                }}
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <form>
                <div className='tw-form-group tw-mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    NIP
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.nip}
                      type='number'
                      className={`${formik.touched.nip && formik.errors.nip ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='nip'
                      placeholder='NIP'
                    />
                    {
                      formik.touched.nip && formik.errors.nip && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.nip}
                      </p>
                    }
                  </div>
                </div>
                <div className='tw-form-group tw-mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Nickname
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.nickname}
                      type='text'
                      className={`${formik.touched.nickname && formik.errors.nickname ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='nickname'
                      placeholder='Employee name'
                    />
                    {
                      formik.touched.nickname && formik.errors.nickname && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.nickname}
                      </p>
                    }
                  </div>
                </div>
                <div className='tw-form-group tw-mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Employee Name
                  </label>

                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.nama_karyawan}
                      type='text'
                      className={`${formik.touched.nama_karyawan && formik.errors.nama_karyawan ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='nama_karyawan'
                      placeholder='Employee name'
                    />
                    {
                      formik.touched.nama_karyawan && formik.errors.nama_karyawan && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.nama_karyawan}
                      </p>
                    }
                  </div>
                </div>
                {/* <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                    id='alamat'
                    placeholder='Address'
                  />
                </div> */}
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    City
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.kota}
                      type='text'
                      className={`${formik.touched.kota && formik.errors.kota ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='kota'
                      placeholder='City'
                    />
                    {
                      formik.touched.kota && formik.errors.kota && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.kota}
                      </p>
                    }
                  </div>
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Birth Place
                    </label>
                    <div className='tw-relative'>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.tmptlahir}
                        type='text'
                        className={`${formik.touched.tmptlahir && formik.errors.tmptlahir ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='tmptlahir'
                        placeholder='Birth place'
                      />
                      {
                        formik.touched.tmptlahir && formik.errors.tmptlahir && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.tmptlahir}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Birth Date
                    </label>
                    <div className='tw-relative'>
                      <MyDatePicker
                        name='tgllahir'
                        value={formik.values.tgllahir}
                        formClassName={`${formik.touched.tgllahir && formik.errors.tgllahir ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal tw-text-left  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        handleOnChange={(name, date) => {
                          formik.setFieldValue(name, date)
                        }}
                        format={`M/DD/YYYY`}
                      />
                      {
                        formik.touched.tgllahir && formik.errors.tgllahir && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.tgllahir}
                        </p>
                      }
                    </div>
                  </div>
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Gender
                    </label>
                    <div className='tw-relative'>
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.jenis_kelamin}
                        id='jenis_kelamin'
                        className={`${formik.touched.jenis_kelamin && formik.errors.jenis_kelamin ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        aria-label='Default select example'
                      >
                        <option value='' disabled>
                          Pilih Gender
                        </option>
                        <option value='laki-laki'>Laki-laki</option>
                        <option value='perempuan'>Perempuan</option>
                      </select>
                      {
                        formik.touched.jenis_kelamin && formik.errors.jenis_kelamin && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.jenis_kelamin}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Maritial Status
                    </label>
                    <div className='tw-relative'>
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        id='status'
                        className={`${formik.touched.status && formik.errors.status ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        aria-label='Default select example'
                      >
                        <option value='' disabled>
                          Pilih Maritial Status
                        </option>
                        <option value='single'>Single</option>
                        <option value='married'>Married</option>
                        <option value='divorce'>Divorce</option>
                      </select>
                      {
                        formik.touched.status && formik.errors.status && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.status}
                        </p>
                      }
                    </div>
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Department
                  </label>

                  <div className='tw-relative'>
                    <select
                      onChange={formik.handleChange}
                      value={formik.values.departement}
                      id='departement'
                      className={`${formik.touched.departement && formik.errors.departement ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      aria-label='Default select example'
                    >
                      <option value='' disabled>
                        Pilih Department
                      </option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                    {
                      formik.touched.departement && formik.errors.departement && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.departement}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Email
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      type='text'
                      className={`${formik.touched.email && formik.errors.email ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='email'
                      placeholder='Phone number'
                    />
                    {
                      formik.touched.email && formik.errors.email && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.email}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    ID Card
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.id_card}
                      type='text'
                      className={`${formik.touched.id_card && formik.errors.id_card ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='id_card'
                      placeholder='ID card'
                    />
                    {
                      formik.touched.id_card && formik.errors.id_card && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.id_card}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Remaining Days Off
                  </label>
                  <div className='tw-relative'>
                    <MyDatePicker
                      name='endjoin'
                      value={formik.values.endjoin}
                      formClassName={`${formik.touched.endjoin && formik.errors.endjoin ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal tw-text-left  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      handleOnChange={(name, date) => {
                        formik.setFieldValue(name, date)
                      }}
                      format={`M/DD/YYYY`}
                    />
                    {
                      formik.touched.endjoin && formik.errors.endjoin && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.endjoin}
                      </p>
                    }
                  </div>
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Employee Status
                    </label>
                    <div className='tw-relative'>
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.karyawan_status}
                        id='karyawan_status'
                        className={`${formik.touched.karyawan_status && formik.errors.karyawan_status ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        aria-label='Default select example'
                      >
                        <option value='' disabled>
                          Pilih Employee Status
                        </option>
                        <option value='Permanent'>Permanent</option>
                        <option value='Kontrak'>Kontrak</option>
                      </select>
                      {
                        formik.touched.karyawan_status && formik.errors.karyawan_status && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.karyawan_status}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Start Joining
                    </label>

                    <div className='tw-relative'>
                      <MyDatePicker
                        name='starjoin'
                        value={formik.values.starjoin}
                        formClassName={`${formik.touched.starjoin && formik.errors.starjoin ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal tw-text-left  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        handleOnChange={(name, date) => {
                          formik.setFieldValue(name, date)
                        }}
                        format={`M/DD/YYYY`}
                      />
                      {
                        formik.touched.starjoin && formik.errors.starjoin && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.starjoin}
                        </p>
                      }
                    </div>
                  </div>
                </div>
                <div className='tw-border-y tw-mt-2 tw-mb-2 tw-py-2'>
                  <div className='tw-flex tw-gap-6'>
                    <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Status
                      </label>
                      <select
                        // name='status'
                        onChange={e =>
                          onChangeLastEdu(e.target.name, e.target.value)
                        }
                        value={lastEdu.status}
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                        aria-label='Default select example'
                      >
                        <option value='' disabled>
                          Pilih Status
                        </option>
                        <option value='sd'>SD</option>
                        <option value='smp'>SMP</option>
                        <option value='sma/smk'>SMA/SMK</option>
                      </select>
                    </div>
                    <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Birth date / Guardiation
                      </label>
                      <MyDatePicker
                        name='date'
                        value={lastEdu.date}
                        formClassName={`tw-text-left tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        handleOnChange={(name, date) =>
                          onChangeLastEdu(name, date)
                        }
                        format={`M/DD/YYYY`}
                      />
                    </div>
                  </div>
                  <div className='form-group mb-2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Description
                    </label>
                    <textarea
                      name='desc'
                      value={lastEdu.desc}
                      onChange={e =>
                        onChangeLastEdu(e.target.name, e.target.value)
                      }
                      type='text'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      id='ppn'
                      placeholder='Description'
                    />
                  </div>
                  <button
                    onClick={saveLastEdu}
                    type='button'
                    className='tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                  >
                    Add
                  </button>
                  {lastEduList.length > 0 && (
                    <div className=' tw-mt-2 tw-px-6 tw-overflow-x-auto'>
                      <table className='tw-max-w-[735px]'>
                        <thead className='tw-bg-white tw-border-b-2 tw-border-t'>
                          <tr>
                            <th
                              scope='tw-col'
                              className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                            >
                              #
                            </th>
                            <th
                              scope='tw-col'
                              className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                            >
                              Status
                            </th>
                            <th
                              scope='tw-col'
                              className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                            >
                              Description
                            </th>
                            <th
                              scope='tw-col'
                              className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                            >
                              Birth date / Guardiation
                            </th>
                            <th
                              scope='tw-col'
                              className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {lastEduList.map((i, idx) => {
                            return (
                              <tr
                                key={idx}
                                className='tw-border-b hover:tw-bg-sky-100'
                              >
                                <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12'>
                                  {idx + 1}
                                </td>
                                <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                  {i.status}
                                </td>
                                <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                  {i.desc}
                                </td>
                                <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                  {i.date}
                                </td>
                                <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap'>

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      removeLastEdu(idx)
                                    }}
                                    className='hover:tw-text-gray-700 tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out'
                                  >
                                    <MdDelete size={18} />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <button
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                onClick={formik.handleSubmit}
                type='button'
                className={`${isEdit && 'tw-cursor-not-allowed tw-opacity-50'} hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out`}
              >
                {
                  isLoading &&
                  <div className="spinner-border animate-spin tw-inline-block tw-w-3 tw-h-3 tw-border-2 tw-rounded-full tw-mr-2" role="status">
                    <span className="tw-visually-hidden">Loading...</span>
                  </div>
                }
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalEdit
