import React, { memo, useState, useEffect, useRef } from 'react'
import { MdDelete } from 'react-icons/md'
import * as Yup from 'yup'
import isObjEqual from '../../utils/isObjEqual'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useFormik, FieldArray } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { editCustomer, getCustomer } from '../../store/slices/customerSlice'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ModalEdit = ({ valAksi, token }) => {
  const modalRef = useRef(null)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const { success, isLoading, type } = useSelector(state => state.customerSlice.resCustomer)

  const formik = useFormik({
    initialValues: {
      id: '',
      id_customer: '',
      nama: '',
      alamat: '',
      kota: '',
      email: '',
      phone: '',
      cuskontak: [{contact_person: '', email_person: '', contact_person_telp: ''}]

    },
    validationSchema: Yup.object({
      nama: Yup.string().required('Customer name is required'),
      alamat: Yup.string().required('Address is required'),
      kota: Yup.string().required('City is required'),
      email: Yup.string().email('Must be a valid email').required('Email is required'),
      phone: Yup.string()
      // .matches(phoneRegExp, 'Phone number is not valid')
      .required('Office phone is required'),
      cuskontak: Yup.array().required('Contact person is required'),
    }),
    onSubmit: (values) => {
      if (!isObjEqual(values, valAksi)) {
        dispatch(editCustomer({ data: values, token: token }))
      }
    },
  })
  

  useEffect(() => {
    formik.setValues((values) => (
      {
        ...values,
        id: valAksi.id,
        id_customer: valAksi.id_customer,
        nama: valAksi.nama,
        alamat: valAksi.alamat,
        kota: valAksi.kota,
        phone: valAksi.phone,
        email: valAksi.email,
        cuskontak: valAksi.cuskontak
      }
    ))
  }, [valAksi])

  useEffect(() => {
    setIsEdit(isObjEqual(valAksi, formik.values))
  }, [formik.values])

  const formikCp = useFormik({
    initialValues: {
      contact_person: "",
      email_person: "",
      contact_person_telp: "",

    },
    validationSchema: Yup.object({
      contact_person: Yup.string().required('Contact person name is required'),
      email_person: Yup.string().email('Must be a valid email').required('Email is required'),
      contact_person_telp: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      formik.setValues(val => ({
        ...val,
        cuskontak: val.cuskontak.concat(values)
      }))
      formikCp.resetForm()
      setTimeout(() => {
        modalRef.current.scrollTop = modalRef.current.scrollHeight;
      }, 10);
    }
  })

  const removeContactPerson = (idx) => {
    formik.setValues((val) => ({
      ...val,
      cuskontak: [...val.cuskontak.slice(0, idx), ...val.cuskontak.slice(idx + 1, val.cuskontak.length)]
    }))
  }


  useEffect(() => {
    if (success) {
      if (type === 'edit') {
        const modal = window.Modal.getInstance(document.querySelector('#edit'))
        modal.hide()
        formik.resetForm({ values: '' })
        dispatch(getCustomer({ token: token }))
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
                Edit Customer
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
              <Tabs>
                <TabList>
                  <Tab>Supplier</Tab>
                  <Tab>Contact Person</Tab>
                </TabList>

                <form>
                  <TabPanel>
                    <div className='form-group mb-2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Customer Name
                    </label>
                    <div className='tw-relative'>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.nama}
                        type='text'
                        className={`${formik.touched.nama && formik.errors.nama ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='nama'
                        placeholder='Customer name'
                      />
                      {
                        formik.touched.nama && formik.errors.nama && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.nama}
                        </p>
                      }
                    </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Address
                      </label>
                      <div className='tw-relative'>
                        <input
                          type='text'
                          className={`${formik.touched.alamat && formik.errors.alamat ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='alamat'
                          onChange={formik.handleChange}
                          value={formik.values.alamat}
                          placeholder='Address'
                        />
                        {
                          formik.touched.alamat && formik.errors.alamat && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.alamat}
                          </p>
                        }
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
                          type='text'
                          className={`${formik.touched.kota && formik.errors.kota ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='kota'
                          onChange={formik.handleChange}
                          value={formik.values.kota}
                          placeholder='City'
                        />
                        {
                          formik.touched.kota && formik.errors.kota && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.kota}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Office Phone Number
                      </label>
                      <div className='tw-relative'>
                        <input
                          type='text'
                          className={`${formik.touched.phone && formik.errors.phone ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='phone'
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          placeholder='Office phone number'
                        />
                        {
                          formik.touched.phone && formik.errors.phone && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.phone}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Office Email
                      </label>
                      <div className='tw-relative'>
                        <input
                          type='text'
                          className={`${formik.touched.email && formik.errors.email ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='email'
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          placeholder='Office email'
                        />
                        {
                          formik.touched.email && formik.errors.email && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.email}
                          </p>
                        }
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                  <div className='tw-relative tw-form-group tw-mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Name
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikCp.handleChange}
                          value={formikCp.values.contact_person}
                          type='text'
                          className={`${formikCp.touched.contact_person && formikCp.errors.contact_person ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='contact_person'
                          name="contact_person"
                          placeholder='Name'
                        />
                        {
                          (formikCp.touched.contact_person && formikCp.errors.contact_person) &&
                          <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formikCp.errors.contact_person}
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
                          Phone Number
                        </label>
                        <div className='tw-relative'>
                          <input
                            onChange={formikCp.handleChange}
                            value={formikCp.values.contact_person_telp}
                            type='text'
                            className={`${formikCp.touched.contact_person_telp && formikCp.errors.contact_person_telp ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id='contact_person_telp'
                            name="contact_person_telp"
                            placeholder='Phone number'
                          />
                          {
                            (formikCp.touched.contact_person_telp && formikCp.errors.contact_person_telp) &&
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikCp.errors.contact_person_telp}
                            </p>
                          }
                        </div>
                      </div>
                      <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                        <label
                          htmlFor='exampleInputEmail2'
                          className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                        >
                          Email
                        </label>
                        <div className='tw-relative'>
                          <input
                            onChange={formikCp.handleChange}
                            value={formikCp.values.email_person}
                            type='text'
                            className={`${formikCp.touched.email_person && formikCp.errors.email_person ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id='email_person'
                            name="email_person"
                            placeholder='Email'
                          />
                          {
                            (formikCp.touched.email_person && formikCp.errors.email_person) &&
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikCp.errors.email_person}
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="tw-relative">
                      <button
                        onClick={formikCp.handleSubmit}
                        type='button'
                        className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                      >
                        Add
                      </button>
                    </div>
                    {
                      formik.values.cuskontak.length > 0 &&
                      <div className=' tw-mt-2 tw-px-6 tw-overflow-x-auto'>
                        <table className='tw-w-full'>
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
                                Name
                              </th>
                              <th
                                scope='tw-col'
                                className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                              >
                                Phone Number
                              </th>
                              <th
                                scope='tw-col'
                                className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                              >
                                Email
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
                            {
                              formik.values.cuskontak.map((i, idx) => {
                                console.log(i);
                                return (
                                  <tr
                                    key={idx}
                                    className='tw-border-b hover:tw-bg-sky-100'
                                  >
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12'>
                                      {idx + 1}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                      {i.contact_person}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                      {i.contact_person_telp}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                      {i.email_person}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap'>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault()
                                          removeContactPerson(idx)
                                        }}
                                        className='hover:tw-text-gray-700 tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out'
                                      >
                                        <MdDelete size={18} />
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    }
                  </TabPanel>
                </form>
              </Tabs>
              {/* <form>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Customer Name
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.nama}
                      type='text'
                      className={`${formik.touched.nama && formik.errors.nama ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='nama'
                      placeholder='Customer name'
                    />
                    {
                      formik.touched.nama && formik.errors.nama && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.nama}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Address
                  </label>
                  <div className='tw-relative'>
                    <input
                      type='text'
                      className={`${formik.touched.alamat && formik.errors.alamat ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='alamat'
                      onChange={formik.handleChange}
                      value={formik.values.alamat}
                      placeholder='Address'
                    />
                    {
                      formik.touched.alamat && formik.errors.alamat && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.alamat}
                      </p>
                    }
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
                      type='text'
                      className={`${formik.touched.kota && formik.errors.kota ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='kota'
                      onChange={formik.handleChange}
                      value={formik.values.kota}
                      placeholder='City'
                    />
                    {
                      formik.touched.kota && formik.errors.kota && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.kota}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Office Phone Number
                  </label>
                  <div className='tw-relative'>
                    <input
                      type='text'
                      className={`${formik.touched.phone && formik.errors.phone ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='phone'
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      placeholder='Office phone number'
                    />
                    {
                      formik.touched.phone && formik.errors.phone && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.phone}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Office Email
                  </label>
                  <div className='tw-relative'>
                    <input
                      type='text'
                      className={`${formik.touched.email && formik.errors.email ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='email'
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder='Office email'
                    />
                    {
                      formik.touched.email && formik.errors.email && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.email}
                      </p>
                    }
                  </div>
                </div>
                
                
                {formik.values.cuskontak.map((val, i) =>{
                  return (
                    <div key={val.id}>
                    <div  className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Contact Person
                      </label>
                      <div className='tw-relative'>
                        <input
                          type='text'
                          className={`${formik.touched.cuskontak && formik.errors.cuskontak ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='contact_person'
                          name={`cuskontak[${i}].contact_person`}
                          onChange={formik.handleChange}
                          value={val.contact_person}
                          placeholder='City'
                        />
                        {
                          formik.touched.cuskontak && formik.errors.cuskontak && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.cuskontak}
                          </p>
                        }
                      </div>
                    </div>

                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Phone Number
                      </label>
                      <input
                        type='text'
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                        id='contact_person_telp'
                        name={`cuskontak[${i}].contact_person_telp`}
                        onChange={formik.handleChange}
                        value={val.contact_person_telp}
                        placeholder='Phone number'
                      />

                        {
                          formik.touched.cuskontak && formik.errors.cuskontak && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.cuskontak}
                          </p>
                        }
                      </div>

                      <div className='form-group mb-2'>
                        <label
                          htmlFor='exampleInputEmail2'
                          className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                        >
                          Email
                        </label>
                      <input
                        type='text'
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                        id='Email'
                        onChange={formik.handleChange}
                        name={`cuskontak[${i}].email_person`}
                        value={val.email_person}
                        placeholder='Email'
                      />
                      {
                          formik.touched.cuskontak && formik.errors.cuskontak && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.cuskontak}
                          </p>
                      }
                      </div>
                    </div>
                  )
                  
                })}
              </form> */}
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
