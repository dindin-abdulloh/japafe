import React, { useEffect, useState, useRef } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { MdDelete } from 'react-icons/md'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux'
import { editSupplier, getSupplier } from '../../store/slices/supplierSlice'
import isObjEqual from '../../utils/isObjEqual'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ModalEdit = ({ valAksi, token }) => {
  console.log(valAksi);
  const modalRef = useRef(null)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()
  const { success, isLoading, type } = useSelector(
    state => state.supplierSlice.resSupplier
  )

  const formik = useFormik({
    initialValues: {
      id: '',
      suplier_type: '',
      id_suplier: '',
      sup_name: '',
      alamat: '',
      kota: '',
      phone: '',
      email: '',
      ppn: '',
      pph: '',
      cuskontak : []
    },
    validationSchema: Yup.object({
      suplier_type: Yup.string().required('Supplier type is required'),
      sup_name: Yup.string().required('Supplier name is required'),
      alamat: Yup.string().required('Address is required'),
      kota: Yup.string().required('City is required'),
      email: Yup.string().email('Must be a valid email').required('Email is required'),
      // bank_akun: Yup.string().required('Bank name is required'),
      // akun_name: Yup.string().required('Account name is required'),
      // akun_number: Yup.string().required('Account number is required'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Office phone is required'),
      ppn: Yup.number().required('PPN is required'),
      pph: Yup.number().required('PPh is required'),
      cuskontak : Yup.array().required('Customer Kontak required'),
    }),
    onSubmit: values => {
      // const initValue = {
      //   suplier_type: values.suplier_type,
      //   id_suplier: values.id_suplier,
      //   sup_name: values.sup_name,
      //   alamat: values.alamat,
      //   kota: values.kota,
      //   phone: values.phone,
      //   email: values.email,
      //   bank_akun: values.bank_akun,
      //   akun_name: values.akun_name,
      //   akun_number: parseInt(values.akun_number),
      //   contact_person_sup: values.contact_person_sup,
      //   ppn: parseInt(values.ppn),
      //   pph: parseInt(values.pph)
      // }
      dispatch(editSupplier({ data: values, token: token }))
    }
  })

  const removeContactPerson = (idx) => {
    formik.setValues((val) => ({
      ...val,
      cuskontak: [...val.cuskontak.slice(0, idx), ...val.cuskontak.slice(idx + 1, val.cuskontak.length)]
    }))
  }

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
      formik.setValues(val => ({
        ...val,
        cuskontak: val.cuskontak.concat(values)
      }))
      formikCp.resetForm({values : ''})
      setTimeout(() => {
        modalRef.current.scrollTop = modalRef.current.scrollHeight;
      }, 10);
    }
  })

  useEffect(() => {
    formik.setValues(values => ({
      ...values,
      id: valAksi.id,
      suplier_type: valAksi.suplier_type,
      id_suplier: valAksi.id_suplier,
      sup_name: valAksi.sup_name,
      alamat: valAksi.alamat,
      kota: valAksi.kota,
      phone: valAksi.phone,
      email: valAksi.email,
      // bank_akun: valAksi.bank_akun,
      // akun_name: valAksi.akun_name,
      // akun_number: valAksi.akun_number,
      // contact_person_sup: valAksi.contact_person_sup,
      ppn: valAksi.ppn,
      pph: valAksi.pph,
      cuskontak : valAksi.cuskontak
    }))
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
        dispatch(getSupplier({ token: token }))
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
                Edit Supplier
              </h5>
             
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}

              <Tabs>
                  <TabList>
                    <Tab>Supplier</Tab>
                    <Tab>Contact Person</Tab>
                  </TabList>

                  <form>
                      <TabPanel>
                        <div className="tab-content" id="tabs-tabContent">
                          <div className="tab-pane fade show active" id="tabs-sup" role="tabpanel" aria-labelledby="tabs-sup-tab">
                            <div className='tw-form-group tw-mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Type Supplier
                              </label>
                              <div className='tw-relative'>
                                <select
                                  onChange={formik.handleChange}
                                  value={formik.values.suplier_type}
                                  id='suplier_type'
                                  name='suplier_type'
                                  className={`${formik.touched.suplier_type && formik.errors.suplier_type ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  aria-label='Default select example'
                                >
                                  <option value="" disabled>
                                    Pilih Jenis
                                  </option>
                                  <option value='Material Suplier'>Material Supplier</option>
                                  <option value='Services Vendor'>Services Vendor</option>
                                </select>
                                {
                                  formik.touched.suplier_type && formik.errors.suplier_type && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.suplier_type}
                                  </p>
                                }
                              </div>
                            </div>
                            <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                ID Supplier
                              </label>
                              <input
                                onChange={formik.handleChange}
                                value={formik.values.id_suplier}
                                disabled
                                type='text'
                                className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                                name='sup_name'
                                id='sup_name'
                                placeholder='Supplier name'
                              />
                            </div>
                            <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Supplier Name
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.sup_name}
                                  type='text'
                                  className={`${formik.touched.sup_name && formik.errors.sup_name ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  name='sup_name'
                                  id='sup_name'
                                  placeholder='Supplier name'
                                />
                                {
                                  formik.touched.sup_name && formik.errors.sup_name && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.sup_name}
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
                                  onChange={formik.handleChange}
                                  value={formik.values.alamat}
                                  name='alamat'
                                  type='text'
                                  className={`${formik.touched.alamat && formik.errors.alamat ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='alamat'
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
                                  onChange={formik.handleChange}
                                  value={formik.values.kota}
                                  name='kota'
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
                            <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Office Phone Number
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.phone}
                                  name='phone'
                                  type='text'
                                  className={`${formik.touched.phone && formik.errors.phone ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='phone'
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
                                  onChange={formik.handleChange}
                                  value={formik.values.email}
                                  name='email'
                                  type='text'
                                  className={`${formik.touched.email && formik.errors.email ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='email'
                                  placeholder='Office email'
                                />
                                {
                                  formik.touched.email && formik.errors.email && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.email}
                                  </p>
                                }
                              </div>
                            </div>
                            {/* <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Contact Person
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.contact_person_sup}
                                  name='contact_person_sup'
                                  type='text'
                                  className={`${formik.touched.contact_person_sup && formik.errors.contact_person_sup ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='contact_person_sup'
                                  placeholder='Contact person'
                                />
                                {
                                  formik.touched.contact_person_sup && formik.errors.contact_person_sup && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.contact_person_sup}
                                  </p>
                                }
                              </div>
                            </div> */}
                            {/* <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Bank Account
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.bank_akun}
                                  name='bank_akun'
                                  type='text'
                                  className={`${formik.touched.bank_akun && formik.errors.bank_akun ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='bank_akun'
                                  placeholder='Bank account'
                                />
                                {
                                  formik.touched.bank_akun && formik.errors.bank_akun && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.bank_akun}
                                  </p>
                                }
                              </div>
                            </div> */}
                            {/* <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Account Name
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.akun_name}
                                  name='akun_name'
                                  type='text'
                                  className={`${formik.touched.akun_name && formik.errors.akun_name ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='akun_name'
                                  placeholder='Account name'
                                />
                                {
                                  formik.touched.akun_name && formik.errors.akun_name && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.akun_name}
                                  </p>
                                }
                              </div>
                            </div> */}
                            {/* <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                Account Number
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.akun_number}
                                  name='akun_number'
                                  type='text'
                                  className={`${formik.touched.akun_number && formik.errors.akun_number ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='akun_number'
                                  placeholder='Account number'
                                />
                                {
                                  formik.touched.akun_number && formik.errors.akun_number && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.akun_number}
                                  </p>
                                }
                              </div>
                            </div> */}
                            <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                PPN
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.ppn}
                                  name='ppn'
                                  type='text'
                                  className={`${formik.touched.ppn && formik.errors.ppn ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='ppn'
                                  placeholder='PPN'
                                />
                                {
                                  formik.touched.ppn && formik.errors.ppn && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.ppn}
                                  </p>
                                }
                              </div>
                            </div>
                            <div className='form-group mb-2'>
                              <label
                                htmlFor='exampleInputEmail2'
                                className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                              >
                                PPh
                              </label>
                              <div className='tw-relative'>
                                <input
                                  onChange={formik.handleChange}
                                  value={formik.values.pph}
                                  name="pph"
                                  type='text'
                                  className={`${formik.touched.pph && formik.errors.pph ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                                  id='pph'
                                  placeholder='PPh'
                                />
                                {
                                  formik.touched.pph && formik.errors.pph && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                                    {formik.errors.pph}
                                  </p>
                                }
                              </div>
                            </div>
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
                <div class="tab-content" id="tabs-tabContent">
                  <div class="tab-pane fade show active" id="tabs-sup" role="tabpanel" aria-labelledby="tabs-sup-tab">
                    <div className='tw-form-group tw-mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Type Supplier
                      </label>
                      <div className='tw-relative'>
                        <select
                          onChange={formik.handleChange}
                          value={formik.values.suplier_type}
                          id='suplier_type'
                          name='suplier_type'
                          className={`${formik.touched.suplier_type && formik.errors.suplier_type ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label='Default select example'
                        >
                          <option value="" disabled>
                            Pilih Jenis
                          </option>
                          <option value='Material Suplier'>Material Supplier</option>
                          <option value='Services Vendor'>Services Vendor</option>
                        </select>
                        {
                          formik.touched.suplier_type && formik.errors.suplier_type && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.suplier_type}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        ID Supplier
                      </label>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.id_suplier}
                        disabled
                        type='text'
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                        name='sup_name'
                        id='sup_name'
                        placeholder='Supplier name'
                      />
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Supplier Name
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.sup_name}
                          type='text'
                          className={`${formik.touched.sup_name && formik.errors.sup_name ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          name='sup_name'
                          id='sup_name'
                          placeholder='Supplier name'
                        />
                        {
                          formik.touched.sup_name && formik.errors.sup_name && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.sup_name}
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
                          onChange={formik.handleChange}
                          value={formik.values.alamat}
                          name='alamat'
                          type='text'
                          className={`${formik.touched.alamat && formik.errors.alamat ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='alamat'
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
                          onChange={formik.handleChange}
                          value={formik.values.kota}
                          name='kota'
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
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Office Phone Number
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          name='phone'
                          type='text'
                          className={`${formik.touched.phone && formik.errors.phone ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='phone'
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
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          name='email'
                          type='text'
                          className={`${formik.touched.email && formik.errors.email ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='email'
                          placeholder='Office email'
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
                        Contact Person
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.contact_person_sup}
                          name='contact_person_sup'
                          type='text'
                          className={`${formik.touched.contact_person_sup && formik.errors.contact_person_sup ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='contact_person_sup'
                          placeholder='Contact person'
                        />
                        {
                          formik.touched.contact_person_sup && formik.errors.contact_person_sup && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.contact_person_sup}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Bank Account
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.bank_akun}
                          name='bank_akun'
                          type='text'
                          className={`${formik.touched.bank_akun && formik.errors.bank_akun ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='bank_akun'
                          placeholder='Bank account'
                        />
                        {
                          formik.touched.bank_akun && formik.errors.bank_akun && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.bank_akun}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Account Name
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.akun_name}
                          name='akun_name'
                          type='text'
                          className={`${formik.touched.akun_name && formik.errors.akun_name ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='akun_name'
                          placeholder='Account name'
                        />
                        {
                          formik.touched.akun_name && formik.errors.akun_name && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.akun_name}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Account Number
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.akun_number}
                          name='akun_number'
                          type='text'
                          className={`${formik.touched.akun_number && formik.errors.akun_number ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='akun_number'
                          placeholder='Account number'
                        />
                        {
                          formik.touched.akun_number && formik.errors.akun_number && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.akun_number}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        PPN
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.ppn}
                          name='ppn'
                          type='text'
                          className={`${formik.touched.ppn && formik.errors.ppn ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='ppn'
                          placeholder='PPN'
                        />
                        {
                          formik.touched.ppn && formik.errors.ppn && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.ppn}
                          </p>
                        }
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        PPh
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.pph}
                          name="pph"
                          type='text'
                          className={`${formik.touched.pph && formik.errors.pph ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='pph'
                          placeholder='PPh'
                        />
                        {
                          formik.touched.pph && formik.errors.pph && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.pph}
                          </p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </form> */}
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <button
                type='button'
                onClick={() => {
                  formik.resetForm({ values: '' })
                }}
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
