import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import MyDatePicker from '../data_picker/MyDatePicker'
import { useFormik } from 'formik'
import { addWorkOrderRelease, getWorkOrderRelease } from '../../store/slices/workOrderReleaseSlice'
import { getQuotation } from '../../store/slices/quotationSlice'
import { getEmployees } from '../../store/slices/employeeSlice'
import { getEquipmentPart } from '../../store/slices/equipmentPartSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

const ModalTambah = ({ val, token }) => {
  const equRef = useRef(null)
  const [selectedEquIdx, setSelectedEquIdx] = useState(null)

  const { data: dataQuot, isLoading: isLoadingQuo } = useSelector(
    state => state.quotationSlice.dataQuotation
  )
  const { data: dataEmp, isLoading: isLoadingEmp } = useSelector(
    state => state.employeeSlice.dataEmployee
  )
  const { data: dataEqu, isLoading: isLoadingEqu } = useSelector(
    state => state.equipmentPartSlice.dataEquipmentPart
  )

  const dispatch = useDispatch()

  const { success, isLoading, type } = useSelector(state => state.workOrderReleaseSlice.resWorkOrderRelease)

  // const dataContoh = [
  //   {
  //     equipment: 'equipment1',
  //     items: [
  //       {
  //         item: 'item1'
  //       },
  //       {
  //         item: 'item1'
  //       },
  //       {
  //         item: 'item1'
  //       }
  //     ]
  //   },
  //   {
  //     equipment: 'equipment2',
  //     items: [
  //       {
  //         item: 'item2'
  //       },
  //       {
  //         item: 'item2'
  //       }
  //     ]
  //   }
  // ]

  const equHandler = (e) => {
    setSelectedEquIdx(e.target.selectedIndex - 1)
    formik.setValues((values) => ({
      ...values,
      equip_id_wor: e.target.value,
      partwor: []

    }))
  }

  const partEquHandler = (e) => {
    // equRef.current.childNodes.forEach(node => {
    //   if (node.firstChild.id === 'all') {
    //     console.log('====================================');
    //     console.log('ashdasdasdjhsj');
    //     console.log('====================================');
    //     node.firstChild.checked = false
    //   } else {

    //   }
    // })
    if (e.target.checked) {
      formik.setValues((val) => ({
        ...val,
        partwor: [...val.partwor, e.target.value]
      }))
    } else {
      const index = formik.values.partwor.indexOf(e.target.value)
      formik.setValues((val) => ({
        ...val,
        partwor: [...val.partwor.slice(0, index), ...val.partwor.slice(index + 1, val.partwor.length)]
      }))
    }
  }

  const formik = useFormik({
    initialValues: {
      job: '',
      quotation_id_wor: '',
      nama_cus: '',
      address: '',
      kota: '',
      tgl_wor: '',
      contact: '',
      email: '',
      subject: '',
      job_description: '',
      contrak_spk: '',
      sales_id_wor: '',
      nilai_kontrak: '',
      priority_stat: '',
      qty: '',
      unit: '',
      tgl_order: '',
      delivery_order: '',
      ship_address: '',
      estimasi_hour: '',
      equip_id_wor: '',
      partwor: [],
      // mfg: '',
      // Rotasi: '',
      // model: '',
      // power: '',
      scope_of_work: '',
      // noted: '',
      upload: '',

    },
    validationSchema: Yup.object({
      job: Yup.string().required('Job is required'),
      quotation_id_wor: Yup.string().required('Quotation is required'),
      address: Yup.string().required('Address is required'),
      tgl_wor: Yup.string().required('Date is required'),
      contact: Yup.string().required('Contact is required'),
      email: Yup.string().required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      job_description: Yup.string().required('Job description is required'),
      contrak_spk: Yup.string().required('Contrak is required'),
      sales_id_wor: Yup.string().required('Sales is required'),
      nilai_kontrak: Yup.number().required('Nilai kontrak is required'),
      priority_stat: Yup.string().required('Priority status is required'),
      qty: Yup.number().required('QTY is required'),
      unit: Yup.string().required('Unit is required'),
      tgl_order: Yup.string().required('Date of order is required'),
      delivery_order: Yup.string().required('Delivery order is required'),
      ship_address: Yup.string().required('Shipping address is required'),
      estimasi_hour: Yup.number().required('Estimate man hour is required'),
      equip_id_wor: Yup.string().required('Equipment is required'),
      partwor: Yup.array().min(1, 'Detail work is required'),
      // mfg: Yup.string().required('mfg is required'),
      // Rotasi: Yup.string().required('Rotasi is required'),
      // model: Yup.string().required('Model is required'),
      // power: Yup.string().required('Power is required'),
      upload: Yup.mixed().required('File is required'),
    }),
    onSubmit: (values) => {

      dispatch(addWorkOrderRelease({ data: values, token: token }))
    }
  })

  const selectQuoNoHandler = (e) => {
    dataQuot.forEach((item) => {
      if (e.target.value === item.id) {
        formik.setValues((values) => ({
          ...values,
          quotation_id_wor: item.id,
          nama_cus: item.customer.nama,
          address: item.address,
          kota: item.city,
          contact: item.contact

        }))
      }
    })
  }


  useEffect(() => {
    equRef.current.childNodes.forEach(node => {
      node.firstChild.checked = false
    })
  }, [selectedEquIdx])

  useLayoutEffect(() => {
    dispatch(getQuotation({ token: token }))
    dispatch(getEmployees({ token: token }))
    dispatch(getEquipmentPart({ token: token }))
  }, [])

  useEffect(() => {
    if (success) {
      if (type === 'tambah') {
        const modal = window.Modal.getInstance(document.querySelector('#tambah'))
        modal.hide()
        formik.resetForm({ values: '' })
        setSelectedEquIdx(null)
        dispatch(getWorkOrderRelease({ token: token }))
      }
    }
  }, [success])

  useEffect(() => {
    formik.setValues((values) => ({
      ...values,
      job: val.createID
    }))
  }, [val])

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
        <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Add Form
              </h5>
              <ul class="nav nav-tabs tw-flex tw-flex-row tw-flex-wrap tw-list-none tw-border-b-0 tw-pl-0" id="tabs-tab"
                role="tablist">
                <li class="nav-item" role="presentation">
                  <a href="#tabs-wor" class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent active"
                    id="tabs-wor-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-wor"
                    role="tab"
                    aria-controls="tabs-wor"
                    aria-selected="true">WOR</a>
                </li>
              </ul>
              {/* <button
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button> */}
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <form>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Job
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.job}
                      disabled
                      type='text'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      name='job'
                      id='job'
                      placeholder='Job'
                    />
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Date
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.tgl_wor}
                      type='date'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      name='tgl_wor'
                      id='tgl_wor'
                      placeholder='Date'
                    />
                  </div>
                </div>
                <div className='flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Quotation Number
                    </label>
                    <div className='tw-relative'>
                      <select
                        onChange={selectQuoNoHandler}
                        value={formik.values.quotation_id_wor}
                        id='quotation_id_wor'
                        className={`${formik.touched.quotation_id_wor && formik.errors.quotation_id_wor ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        aria-label='Default select example'
                      >
                        <option value='' disabled>
                          Pilih Customer
                        </option>
                        {dataQuot.length > 0 &&
                          dataQuot.map((i, idx) => {
                            return (
                              <option key={idx} value={i.id}>
                                {i.quo_number}
                              </option>
                            )
                          })}
                      </select>
                      {
                        formik.touched.quotation_id_wor && formik.errors.quotation_id_wor && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.quotation_id_wor}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Customer
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.nama_cus}
                      disabled
                      type='text'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      name='nama_cus'
                      id='nama_cus'
                      placeholder='Customer name'
                    />
                  </div>
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Adress
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      disabled
                      type='text'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      name='address'
                      id='address'
                      placeholder='Address'
                    />
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      City
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.kota}
                      disabled
                      type='text'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      name='kota'
                      id='kota'
                      placeholder='City'
                    />
                  </div>
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Contact
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.contact}
                      disabled
                      type='text'
                      className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'
                      name='contact'
                      id='contact'
                      placeholder='Contact'
                    />
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
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type='text'
                        className={`${formik.touched.email && formik.errors.email ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='email'
                        name='email'
                        placeholder='Email'
                      />
                      {
                        formik.touched.email && formik.errors.email && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.email}
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
                    Subject
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.subject}
                      type='text'
                      className={`${formik.touched.subject && formik.errors.subject ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='subject'
                      name='subject'
                      placeholder='Subject'
                    />
                    {
                      formik.touched.subject && formik.errors.subject && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.subject}
                      </p>
                    }
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Job Description
                  </label>
                  <textarea
                    type='textarea'
                    onChange={formik.handleChange}
                    value={formik.values.job_description}
                    className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                    id='job_description'
                    rows='3'
                    placeholder='Job description'
                  />
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      No SPK
                    </label>
                    <div className='tw-relative'>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.contrak_spk}
                        type='number'
                        className={`${formik.touched.contrak_spk && formik.errors.contrak_spk ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='contrak_spk'
                        name='contrak_spk'
                        placeholder='No SPK'
                      />
                      {
                        formik.touched.contrak_spk && formik.errors.contrak_spk && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.contrak_spk}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Sales
                    </label>
                    <div className='flex'>
                      <div className='tw-relative'>
                        <select
                          onChange={formik.handleChange}
                          value={formik.values.sales_id_wor}
                          id='sales_id_wor'
                          className={`${formik.touched.sales_id_wor && formik.errors.sales_id_wor ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded-l tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label='Default select example'
                        >
                          <option value='' disabled>
                            Pilih Sales
                          </option>
                          {dataEmp.length > 0 &&
                            dataEmp.map((i, idx) => {
                              return (
                                <option key={idx} value={i.id}>
                                  {i.nama_karyawan}
                                </option>
                              )
                            })}
                        </select>
                        {
                          formik.touched.sales_id_wor && formik.errors.sales_id_wor && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.sales_id_wor}
                          </p>
                        }
                      </div>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.nilai_kontrak}
                          type='number'
                          className={`${formik.touched.nilai_kontrak && formik.errors.nilai_kontrak ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded-r tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='nilai_kontrak'
                          placeholder='Nilai Kontrak'
                        />
                        {
                          formik.touched.nilai_kontrak && formik.errors.nilai_kontrak && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.nilai_kontrak}
                          </p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className='tw-flex tw-gap-6'>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Priority Status
                    </label>
                    <div className='flex'>
                      <div className='tw-relative'>
                        <select
                          onChange={formik.handleChange}
                          value={formik.values.priority_stat}
                          id='priority_stat'
                          className={`${formik.touched.priority_stat && formik.errors.priority_stat ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded-l tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label='Default select example'
                        >
                          <option value="" disabled>
                            Pilih Priority Status
                          </option>
                          <option value='ST'>ST</option>
                          <option value='XT'>XT</option>
                          <option value='XXT'>XXT</option>
                          <option value='XT as Req'>XT as Req</option>
                          <option value='XXT as Req'>XXT as Req</option>
                        </select>
                        {
                          formik.touched.sales_id_wor && formik.errors.sales_id_wor && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.sales_id_wor}
                          </p>
                        }
                      </div>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.qty}
                          type='number'
                          className={`${formik.touched.qty && formik.errors.qty ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded-r tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='qty'
                          placeholder='QTY'
                        />
                        {
                          formik.touched.qty && formik.errors.qty && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.qty}
                          </p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Unit
                    </label>
                    <div className='tw-relative'>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.unit}
                        type='text'
                        className={`${formik.touched.unit && formik.errors.unit ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='unit'
                        name='unit'
                        placeholder='Unit'
                      />
                      {
                        formik.touched.unit && formik.errors.unit && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.unit}
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
                      Date Of Order
                    </label>
                    <div className='tw-relative'>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.tgl_order}
                        type='date'
                        className={`${formik.touched.tgl_order && formik.errors.tgl_order ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='tgl_order'
                        name='tgl_order'
                        placeholder='Date of order'
                      />
                      {
                        formik.touched.tgl_order && formik.errors.tgl_order && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.tgl_order}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Delivery Date
                    </label>
                    <div className='tw-relative'>
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.delivery_order}
                        type='date'
                        className={`${formik.touched.delivery_order && formik.errors.delivery_order ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        id='delivery_order'
                        name='delivery_order'
                        placeholder='Delivery order'
                      />
                      {
                        formik.touched.delivery_order && formik.errors.delivery_order && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.delivery_order}
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
                    Shipping Address
                  </label>
                  <textarea
                    type='textarea'
                    onChange={formik.handleChange}
                    value={formik.values.ship_address}
                    className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                    id='ship_address'
                    rows='3'
                    placeholder='Shipping Address'
                  />
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Estimate Man Hour
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.estimasi_hour}
                      type='number'
                      className={`${formik.touched.estimasi_hour && formik.errors.estimasi_hour ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='estimasi_hour'
                      name='estimasi_hour'
                      placeholder='Estimate man hour'
                    />
                    {
                      formik.touched.estimasi_hour && formik.errors.estimasi_hour && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.estimasi_hour}
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
                      Equipment
                    </label>
                    <div className='tw-relative'>
                      <select
                        onChange={equHandler}
                        value={formik.values.equip_id_wor}
                        id='equip_id_wor'
                        className={`${formik.touched.equip_id_wor && formik.errors.equip_id_wor ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded-l tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                        aria-label='Default select example'
                      >
                        <option value='' disabled>
                          Pilih Sales
                        </option>
                        {dataEqu.length > 0 &&
                          dataEqu.map((i, idx) => {
                            return (
                              <option key={idx} value={i.id}>
                                {i.equip_nama}
                              </option>
                            )
                          })}
                      </select>
                      {
                        formik.touched.equip_id_wor && formik.errors.equip_id_wor && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                          {formik.errors.equip_id_wor}
                        </p>
                      }
                    </div>
                  </div>
                  <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                    <label
                      htmlFor='exampleInputEmail2'
                      className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                    >
                      Part Equipment
                    </label>
                    <div
                      ref={equRef}
                      className='tw-flex tw-flex-wrap tw-gap-3 tw-min-h-[37px] tw-form-control tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                    >
                      {
                        selectedEquIdx !== null &&
                        dataEqu[selectedEquIdx].equipmen.map((item, idx) => {
                          return (
                            <div key={idx} className="tw-form-check">
                              <input
                                onChange={partEquHandler}
                                className="tw-form-check-input tw-appearance-none tw-h-4 tw-w-4 tw-border tw-border-gray-300 tw-rounded tw-bg-white checked:tw-bg-sky-600 checked:tw-border-sky-600 focus:tw-outline-none tw-transition tw-duration-200 tw-mt-[1px] tw-align-top tw-bg-no-repeat tw-bg-center tw-bg-contain tw-float-left tw-mr-2 tw-cursor-pointer"
                                type="checkbox"
                                value={item.part_nama}
                                id="flexCheckDefault" />
                              <label className="tw-form-check-label tw-m-0 tw-inline-block tw-text-gray-700" htmlFor="flexCheckDefault">
                                {item.part_nama}
                              </label>
                            </div>
                          )
                        })

                      }
                      {/* {selectedEquIdx !== null &&
                        <div className="tw-form-check">
                          <input
                            onChange={(e) => {
                              equRef.current.childNodes.forEach(node => {
                                if (node.firstChild.id !== 'all') {
                                  node.firstChild.checked = false
                                } else {
                                  // console.log(JSON.parse(e.target.value));
                                  // console.log('====================================');
                                  // console.log('jalan');
                                  // console.log('====================================');
                                  if (e.target.checked) {
                                    formik.setValues(val => ({
                                      ...val,
                                      partwor: JSON.parse(e.target.value)
                                    }))
                                  } else {
                                    formik.setValues(val => ({
                                      ...val,
                                      partwor: []
                                    }))
                                  }
                                }
                              })
                            }}
                            className="tw-form-check-input tw-appearance-none tw-h-4 tw-w-4 tw-border tw-border-gray-300 tw-rounded tw-bg-white checked:tw-bg-sky-600 checked:tw-border-sky-600 focus:tw-outline-none tw-transition tw-duration-200 tw-mt-[1px] tw-align-top tw-bg-no-repeat tw-bg-center tw-bg-contain tw-float-left tw-mr-2 tw-cursor-pointer"
                            type="checkbox"
                            value={JSON.stringify(dataEqu[selectedEquIdx].equipmen)}
                            id="all" />
                          <label className="tw-form-check-label tw-m-0 tw-inline-block tw-text-gray-700" htmlFor="flexCheckDefault">
                            all
                          </label>
                        </div>
                      } */}
                    </div>
                  </div>
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Scope Of Work
                  </label>
                  <textarea
                    type='textarea'
                    onChange={formik.handleChange}
                    value={formik.values.scope_of_work}
                    className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                    id='scope_of_work'
                    rows='3'
                    placeholder='Scope of work'
                  />
                </div>
                <div className='form-group mb-2'>
                  <label
                    htmlFor='exampleInputEmail2'
                    className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                  >
                    Upload File
                  </label>
                  <div className='tw-relative'>
                    <input
                      onChange={(e) => {
                        formik.setValues((val) => ({
                          ...val,
                          upload: e.currentTarget.files[0]
                        }))
                      }}
                      type='file'
                      accept="upload/*"
                      className={`${formik.touched.upload && formik.errors.upload ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      id='upload'
                      name="upload"
                      placeholder='Upload file'
                    />
                    {
                      (formik.touched.upload && formik.errors.upload) &&
                      <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                        {formik.errors.upload}
                      </p>
                    }
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <button
                onClick={() => {
                  formik.resetForm({ values: '' })
                  setSelectedEquIdx(null)
                }}
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                onClick={formik.handleSubmit}
                type='button'
                className='hover:tw-bg-red-600 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
              >
                {
                  isLoading &&
                  <div className="spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2" role="status">
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

export default ModalTambah
