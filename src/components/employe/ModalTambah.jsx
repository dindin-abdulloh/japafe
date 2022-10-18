import React, { useEffect, useLayoutEffect, useRef } from 'react'
// import MyDatePicker from '../data_picker/MyDatePicker'
import { MdDelete } from 'react-icons/md'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee, getEmployees, getDepart } from '../../store/slices/employeeSlice'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ModalTambah = ({ token }) => {
  const dispatch = useDispatch()
  const { success, isLoading, type } = useSelector(
    state => state.employeeSlice.resEmployee
  )

  const depart = useSelector(state => state.employeeSlice.dataDepart)


  const modalRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      id: '',
      NIP: '',
      nickname: '',
      nama_karyawan: '',
      departement: '',
      email: '',
      phone: '',
      tmptlahir: '',
      tgllahir: '',
      id_card: '',
      karyawan_status: '',
      jenis_kelamin: '',
      status: '',
      alamat: '',
      kota: '',
      starjoin: '',
      sisa_cuti: '',
      emppen: [],
      emppel: []
    },
    validationSchema: Yup.object({
      NIP: Yup.string().required('NIP is required'),
      nickname: Yup.string().required('Nickname is required'),
      nama_karyawan: Yup.string().required('Employee name is required'),
      departement: Yup.string().required('Department is required'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone is required'),
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
      tmptlahir: Yup.string().required('Birth place is required'),
      tgllahir: Yup.string().required('Birth date is required'),
      id_card: Yup.number().required('ID Card is required'),
      karyawan_status: Yup.string().required('Employee status is required'),
      jenis_kelamin: Yup.string().required('Gender status is required'),
      status: Yup.string().required('Maritial status is required'),
      alamat: Yup.string().required('Adress is required'),
      kota: Yup.string().required('City person is required'),
      starjoin: Yup.string().required('Start joining person is required'),
      sisa_cuti: Yup.number().required('Remaining Days Off is required'),
      emppen: Yup.array().min(1, 'Education is required'),
      emppel : Yup.array().min(1, 'Certification is required')
    }),
    onSubmit: values => {
      dispatch(addEmployee({ data: values, token: token }))
    }
  })

  const formikEdu = useFormik({
    initialValues: {
      no: "",
      jns_pndidikan: '',
      nama_sekolah: '',
      thun_lulus: ''
    },
    validationSchema: Yup.object({
      jns_pndidikan: Yup.string().required('Education status is required'),
      nama_sekolah: Yup.string().required('School name is required'),
      thun_lulus: Yup.string().required('Birth date / Guardiation is required'),
    }),
    onSubmit: values => {
      console.log(values);

      formik.setValues(val => ({
        
        ...val,
        emppen: val.emppen.concat(values)
      }))
      formikEdu.resetForm()
    }
  })

  const formikCert = useFormik({
    initialValues: {
      no: '',
      jns_pelatihan: '',
      ket: '',
      wktu_selesai: '',
      upload: ''
    },
    validationSchema: Yup.object({
      jns_pelatihan: Yup.string().required('Certificate status is required'),
      wktu_selesai: Yup.string().required('Birth date / Guardiation is required'),
      upload: Yup.mixed().required('File is required')
    }),
    onSubmit: values => {
      formik.setValues(val => ({
        ...val,
        emppel: val.emppel.concat(values)
      }))
      formikCert.resetForm()
      document.querySelector('#upload').value = ''
    }
  })

  const removeEdu = idx => {
    formik.setValues((val) => ({
      ...val,
      emppen: [...val.emppen.slice(0, idx), ...val.emppen.slice(idx + 1, val.emppen.length)]
    }))
  }

  const removeCert = idx => {
    formik.setValues((val) => ({
      ...val,
      emppel: [...val.emppel.slice(0, idx), ...val.emppel.slice(idx + 1, val.emppel.length)]
    }))
  }


  useEffect(() => {
    if (success) {
      if (type === 'tambah') {
        const modal = window.Modal.getInstance(
          document.querySelector('#tambah')
        )
        modal.hide()
        formik.resetForm({ values: '' })
        dispatch(getEmployees({ token: token }))
      }
    }
  }, [success])

  useLayoutEffect(() => {
    dispatch(getDepart({ token: token }))
}, [])

  return (
    <React.Fragment>
      <div
        className='modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto'
        id='tambah'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='detail'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Add Employee
              </h5>
            </div>
            <div
              ref={modalRef}
              className='modal-body tw-relative tw-py-2 tw-px-6'
            >
              <Tabs>
                  <TabList>
                    <Tab>Employee</Tab>
                    <Tab>Educations</Tab>
                    <Tab>Certifications</Tab>
                  </TabList>

                  <form>
                    <TabPanel>
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
                          value={formik.values.NIP}
                          type='text'
                          min={0}
                          className={`${formik.touched.NIP && formik.errors.NIP
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='NIP'
                          placeholder='NIP'
                        />
                        {formik.touched.NIP && formik.errors.NIP && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.NIP}
                          </p>
                        )}
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
                          className={`${formik.touched.nickname && formik.errors.nickname
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='nickname'
                          placeholder='Employee name'
                        />
                        {formik.touched.nickname && formik.errors.nickname && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.nickname}
                          </p>
                        )}
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
                          className={`${formik.touched.nama_karyawan &&
                            formik.errors.nama_karyawan
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='nama_karyawan'
                          placeholder='Employee name'
                        />
                        {formik.touched.nama_karyawan &&
                          formik.errors.nama_karyawan && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formik.errors.nama_karyawan}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Adress
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.alamat}
                          type='text'
                          className={`${formik.touched.alamat && formik.errors.alamat
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='alamat'
                          placeholder='Adress'
                        />
                        {formik.touched.alamat && formik.errors.alamat && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.alamat}
                          </p>
                        )}
                      </div>
                    </div>
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
                          className={`${formik.touched.kota && formik.errors.kota
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='kota'
                          placeholder='City'
                        />
                        {formik.touched.kota && formik.errors.kota && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.kota}
                          </p>
                        )}
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
                            className={`${formik.touched.tmptlahir && formik.errors.tmptlahir
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                              } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id='tmptlahir'
                            placeholder='Birth place'
                          />
                          {formik.touched.tmptlahir && formik.errors.tmptlahir && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formik.errors.tmptlahir}
                            </p>
                          )}
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
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.tgllahir}
                            type='date'
                            className={`${formik.touched.tgllahir && formik.errors.tgllahir
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                              } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id='tgllahir'
                            placeholder=''
                          />
                          {formik.touched.tgllahir && formik.errors.tgllahir && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formik.errors.tgllahir}
                            </p>
                          )}
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
                            className={`${formik.touched.jenis_kelamin &&
                              formik.errors.jenis_kelamin
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                              } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            aria-label='Default select example'
                          >
                            <option value='' disabled>
                              Pilih Gender
                            </option>
                            <option value='Laki-Laki'>Laki-laki</option>
                            <option value='Perempuan'>Perempuan</option>
                          </select>
                          {formik.touched.jenis_kelamin &&
                            formik.errors.jenis_kelamin && (
                              <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                {formik.errors.jenis_kelamin}
                              </p>
                            )}
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
                            className={`${formik.touched.status && formik.errors.status
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                              } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            aria-label='Default select example'
                          >
                            <option value='' disabled>
                              Pilih Maritial Status
                            </option>
                            <option value='Single'>Single</option>
                            <option value='Married'>Married</option>
                            <option value='Divorce'>Divorce</option>
                          </select>
                          {formik.touched.status && formik.errors.status && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formik.errors.status}
                            </p>
                          )}
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
                          className={`${formik.touched.departement && formik.errors.departement
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label='Default select example'
                        >
                          
                          <option value='' disabled>
                            Pilih Department
                          </option>
                          {depart.result.map((val) => {
                            return (
                              <option value={val.id}>{val.namadep}</option>
                            )
                          })}
                          
                          {/* <option value='2'>Two</option>
                          <option value='3'>Three</option> */}
                        </select>
                        {formik.touched.departement &&
                          formik.errors.departement && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formik.errors.departement}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Phone
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          type='text'
                          className={`${formik.touched.phone && formik.errors.phone
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='phone'
                          placeholder='Phone number'
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.phone}
                          </p>
                        )}
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
                          className={`${formik.touched.email && formik.errors.email
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='email'
                          placeholder='Email'
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.email}
                          </p>
                        )}
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
                          className={`${formik.touched.id_card && formik.errors.id_card
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='id_card'
                          placeholder='ID card'
                        />
                        {formik.touched.id_card && formik.errors.id_card && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.id_card}
                          </p>
                        )}
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
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.sisa_cuti}
                          type='number'
                          min={0}
                          className={`${formik.touched.sisa_cuti && formik.errors.sisa_cuti
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='sisa_cuti'
                          placeholder='Remaining days off'
                        />
                        {formik.touched.sisa_cuti && formik.errors.sisa_cuti && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.sisa_cuti}
                          </p>
                        )}
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
                            className={`${formik.touched.karyawan_status &&
                              formik.errors.karyawan_status
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                              } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            aria-label='Default select example'
                          >
                            <option value='' disabled>
                              Pilih Employee Status
                            </option>
                            <option value='Permanent'>Permanent</option>
                            <option value='Kontrak'>Kontrak</option>
                          </select>
                          {formik.touched.karyawan_status &&
                            formik.errors.karyawan_status && (
                              <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                {formik.errors.karyawan_status}
                              </p>
                            )}
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
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.starjoin}
                            type='date'
                            className={`${formik.touched.starjoin && formik.errors.starjoin
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                              } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id='starjoin'
                            placeholder=''
                          />
                          {formik.touched.starjoin && formik.errors.starjoin && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formik.errors.starjoin}
                            </p>
                          )}
                        </div>
                      </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                        <div className='form-group mb-2'>
                          <label
                            htmlFor='exampleInputEmail2'
                            className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                          >
                            Status
                          </label>
                          <div className='tw-relative'>
                            <select
                              id='jns_pndidikan'
                              onChange={formikEdu.handleChange}
                              value={formikEdu.values.jns_pndidikan}
                              className={`${formikEdu.touched.jns_pndidikan && formikEdu.errors.jns_pndidikan
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                                } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                              aria-label='Default select example'
                            >
                              <option value='' disabled>
                                Pilih Status
                              </option>
                              <option value='SD'>SD</option>
                              <option value='SMP'>SMP</option>
                              <option value='SMA/SMK'>SMA/SMK</option>
                              <option value='D3'>D3</option>
                              <option value='S1'>S1</option>
                            </select>
                            {formikEdu.touched.jns_pndidikan && formikEdu.errors.jns_pndidikan && (
                              <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                {formikEdu.errors.jns_pndidikan}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className='form-group mb-2'>
                          <label
                            htmlFor='exampleInputEmail2'
                            className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                          >
                            School / University
                          </label>
                          <div className='tw-relative'>
                            <input
                              onChange={formikEdu.handleChange}
                              value={formikEdu.values.nama_sekolah}
                              type='text'
                              className={`${formikEdu.touched.nama_sekolah && formikEdu.errors.nama_sekolah
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                                } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                              id='nama_sekolah'
                              placeholder='School / University'
                            />
                            {formikEdu.touched.nama_sekolah && formikEdu.errors.nama_sekolah && (
                              <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                {formikEdu.errors.nama_sekolah}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className='form-group mb-2'>
                          <label
                            htmlFor='exampleInputEmail2'
                            className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                          >
                            Birth date / Guardiation
                          </label>
                          <div className='tw-relative'>
                            <input
                              onChange={formikEdu.handleChange}
                              value={formikEdu.values.thun_lulus}
                              type='date'
                              className={`${formikEdu.touched.thun_lulus && formikEdu.errors.thun_lulus
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                                } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                              id='thun_lulus'
                              placeholder='Birth date / Guardiation'
                            />
                            {formikEdu.touched.thun_lulus && formikEdu.errors.thun_lulus && (
                              <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                {formikEdu.errors.thun_lulus}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="tw-relative">
                          <button
                            onClick={formikEdu.handleSubmit}
                            type='button'
                            className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                          >
                            Add
                          </button>
                        </div>
                        {formik.values.emppen.length > 0 && (
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
                                    School / University
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
                                {formik.values.emppen.map((i, idx) => {
                                  return (
                                    <tr
                                      key={idx}
                                      className='tw-border-b hover:tw-bg-sky-100'
                                    >
                                      <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12'>
                                        {idx + 1}
                                      </td>
                                      <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                        {i.jns_pndidikan}
                                      </td>
                                      <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                        {i.nama_sekolah}
                                      </td>
                                      <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                        {i.thun_lulus}
                                      </td>
                                      <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap'>
                                        <button
                                          onClick={e => {
                                            e.preventDefault()
                                            removeEdu(idx)
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
                    </TabPanel>

                    <TabPanel>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Status
                      </label>
                      <div className='tw-relative'>
                        <select
                          id='jns_pelatihan'
                          onChange={formikCert.handleChange}
                          value={formikCert.values.jns_pelatihan}
                          className={`${formikCert.touched.jns_pelatihan && formikCert.errors.jns_pelatihan
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label='Default select example'
                        >
                          <option value='' disabled>
                            Pilih Status
                          </option>
                          <option value='SD'>SD</option>
                          <option value='SMP'>SMP</option>
                          <option value='SMA/SMK'>SMA/SMK</option>
                          <option value='D3'>D3</option>
                          <option value='S1'>S1</option>
                        </select>
                        {formikCert.touched.jns_pelatihan && formikCert.errors.jns_pelatihan && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formikCert.errors.jns_pelatihan}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='tw-form-group tw-mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Description
                      </label>
                      <textarea
                        onChange={formikCert.handleChange}
                        value={formikCert.values.ket}
                        type='textarea'
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                        id='ket'
                        rows='3'
                        placeholder='Description'
                      />
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Birth date / Guardiation
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikCert.handleChange}
                          value={formikCert.values.wktu_selesai}
                          type='date'
                          className={`${formikCert.touched.wktu_selesai && formikCert.errors.wktu_selesai
                            ? `tw-border-red-500`
                            : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='wktu_selesai'
                          placeholder=''
                        />
                        {formikCert.touched.wktu_selesai && formikCert.errors.wktu_selesai && (
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formikCert.errors.wktu_selesai}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='tw-form-group tw-mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Upload File
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={(e) => {
                            formikCert.setValues((val) => ({
                              ...val,
                              upload: e.currentTarget.files[0]
                            }))
                          }}
                          type='file'
                          accept="upload/*"
                          className={`${formikCert.touched.upload && formikCert.errors.upload ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='upload'
                          name="upload"
                          placeholder='Upload file'
                        />
                        {
                          (formikCert.touched.upload && formikCert.errors.upload) &&
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formikCert.errors.upload}
                          </p>
                        }
                      </div>
                    </div>
                    <button
                      onClick={formikCert.handleSubmit}
                      type='button'
                      className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    >
                      Add
                    </button>
                    {formik.values.emppel.length > 0 && (
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
                                Certification
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
                            {formik.values.emppel.map((i, idx) => {
                              return (
                                <tr
                                  key={idx}
                                  className='tw-border-b hover:tw-bg-sky-100'
                                >
                                  <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12'>
                                    {idx + 1}
                                  </td>
                                  <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                    {i.jns_pelatihan}
                                  </td>
                                  <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                    {i.ket}
                                  </td>
                                  <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                    {i.wktu_selesai}
                                  </td>
                                  <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                    <img src={URL.createObjectURL(i.upload)} alt="" className='tw-object-cover' />
                                  </td>
                                  <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap'>
                                    <button
                                      onClick={e => {
                                        e.preventDefault()
                                        removeCert(idx)
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
                
                    </TabPanel>
                  </form>
              </Tabs>
            </div>
            <div className='modal-footer tw-relative tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              {
                (formik.touched.emppen && formik.errors.emppen) &&
                <p className='tw-absolute tw-text-red-500 tw-left-6 tw-top-4 tw-m-0 tw-text-xs'>
                  {formik.errors.emppen}
                </p>
              }
              <button
                onClick={() => {
                  formik.resetForm({ values: '' })
                  formikEdu.resetForm({ values: '' })
                  formikCert.resetForm({ values: '' })
                }}
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                data-bs-dismiss='modal'
              >
                Cancel
              </button>
              <button
                onClick={formik.handleSubmit}
                type='button'
                className='hover:tw-bg-red-600 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
              >
                {isLoading && (
                  <div
                    className='spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2'
                    role='status'
                  >
                    <span className='tw-visually-hidden'>Loading...</span>
                  </div>
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalTambah
