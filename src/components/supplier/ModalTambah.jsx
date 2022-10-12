import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addSupplier, getSupplier } from '../../store/slices/supplierSlice'
import * as Yup from 'yup'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ModalTambah = ({ val, token }) => {
  const dispatch = useDispatch()
  const { success, isLoading, type } = useSelector(state => state.supplierSlice.resSupplier)

  const formik = useFormik({
    initialValues: {
      suplier_type: '',
      id_suplier: '',
      sup_name: '',
      alamat: '',
      kota: '',
      phone: '',
      email: '',
      bank_akun: '',
      akun_name: '',
      akun_number: '',
      contact_person_sup: '',
      ppn: '',
      pph: ''

    },
    validationSchema: Yup.object({
      suplier_type: Yup.string().required('Supplier type is required'),
      sup_name: Yup.string().required('Supplier name is required'),
      alamat: Yup.string().required('Address is required'),
      kota: Yup.string().required('City is required'),
      email: Yup.string().email('Must be a valid email').required('Email is required'),
      bank_akun: Yup.string().required('Bank name is required'),
      akun_name: Yup.string().required('Account name is required'),
      akun_number: Yup.string().required('Account number is required'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Office phone is required'),
      contact_person_sup: Yup.string().required('Contact person is required'),
      ppn: Yup.number().required('PPN is required'),
      pph: Yup.number().required('PPh is required'),
    }),
    onSubmit: (values) => {
      const initValue = {
        suplier_type: values.suplier_type,
        id_suplier: values.id_suplier,
        sup_name: values.sup_name,
        alamat: values.alamat,
        kota: values.kota,
        phone: values.phone,
        email: values.email,
        bank_akun: values.bank_akun,
        akun_name: values.akun_name,
        akun_number: parseInt(values.akun_number),
        contact_person_sup: values.contact_person_sup,
        ppn: parseInt(values.ppn),
        pph: parseInt(values.pph)
      }

      dispatch(addSupplier({ data: initValue, token: token }))
    }
  })

  useEffect(() => {
    if (success) {
      if (type === 'tambah') {
        const modal = window.Modal.getInstance(document.querySelector('#tambah'))
        modal.hide()
        formik.resetForm({ values: '' })
        dispatch(getSupplier({ token: token }))
      }
    }
  }, [success])

  useEffect(() => {
    formik.setValues((values) => ({
      ...values,
      id_suplier: val.createID
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
              {/* <div className='tw-flex tw-items-center'>
                
              </div> */}
              <h5
                className='tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Add Form
              </h5>
              <ul class="nav nav-tabs tw-flex tw-flex-row tw-flex-wrap tw-list-none tw-border-b-0 tw-pl-0" id="tabs-tab"
                role="tablist">
                <li class="nav-item" role="presentation">
                  <a href="#tabs-sup" class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent active"
                    id="tabs-sup-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-sup"
                    role="tab"
                    aria-controls="tabs-sup"
                    aria-selected="true">Supplier</a>
                </li>
              </ul>
              {/* <button
                onClick={() => {
                  formik.resetForm({ values: '' })
                }}
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button> */}
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <form>
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
                          className={`tw-border-gray-300 tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='ppn'
                          placeholder='PPN'
                        />
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
                          className={`tw-border-gray-300 tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='pph'
                          placeholder='PPh'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
