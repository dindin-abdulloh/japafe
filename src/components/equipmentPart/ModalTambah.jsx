import React, { useRef, useState, useEffect } from 'react'
import moment from 'moment'
import MyDatePicker from '../data_picker/MyDatePicker'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addEquomentPart, getEquipmentPart } from '../../store/slices/equipmentPartSlice'


const ModalTambah = ({ val, token }) => {
  const dispatch = useDispatch()
  const { success, isLoading, type } = useSelector(state => state.equipmentPartSlice.resEquipmentPart)
  const modalRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      id_equipment: "",
      equip_nama: "",
      description: "",
      equipmen: []

    },
    validationSchema: Yup.object({
      equip_nama: Yup.string().required('Equipment name is required'),
      equipmen: Yup.array().min(1, 'Part is required')
    }),
    onSubmit: (values) => {
      dispatch(addEquomentPart({ data: values, token: token }))
    }
  })

  const formikPart = useFormik({
    initialValues: {
      part_nama: '',
      description: '',

    },
    validationSchema: Yup.object({
      part_nama: Yup.string().required('Part name is required'),
      description: Yup.string().required('Type part is required'),
    }),
    onSubmit: (values) => {
      formik.setValues(val => ({
        ...val,
        equipmen: val.equipmen.concat(values)
      }))
      formikPart.resetForm()
      setTimeout(() => {
        modalRef.current.scrollTop = modalRef.current.scrollHeight;
      }, 10);
    }
  })

  const removeListPart = (idx) => {
    formik.setValues((val) => ({
      ...val,
      equipmen: [...val.equipmen.slice(0, idx), ...val.equipmen.slice(idx + 1, val.equipmen.length)]
    }))
  }


  useEffect(() => {
    formik.setValues((values) => ({
      ...values,
      id_equipment: val.createID
    }))
  }, [val])

  useEffect(() => {
    if (success) {
      if (type === 'tambah') {
        const modal = window.Modal.getInstance(document.querySelector('#tambah'))
        modal.hide()
        formik.resetForm({ values: '' })
        dispatch(getEquipmentPart({ token: token }))
      }
    } else {
      console.log("jalankannn");
    }
  }, [success])


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
                Add Form
              </h5>
              <ul class="nav nav-tabs tw-flex tw-flex-row tw-flex-wrap tw-list-none tw-border-b-0 tw-pl-0" id="tabs-tab"
                role="tablist">
                <li class="nav-item" role="presentation">
                  <a href="#tabs-equpment" class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-uppercase tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent active"
                    id="tabs-equpment-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-equpment"
                    role="tab"
                    aria-controls="tabs-equpment"
                    aria-selected="true">Equipment</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a href="#tabs-part" class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-uppercase tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent"
                    id="tabs-part-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-part"
                    role="tab"
                    aria-controls="tabs-part"
                    aria-selected="false">Part</a>
                </li>
              </ul>
              {/* <button
                onClick={() => {
                  formik.resetForm({ values: '' })
                  formikPart.resetForm({ values: '' })
                }}
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button> */}
            </div>
            <div ref={modalRef} className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <form>
                <div class="tab-content" id="tabs-tabContent">
                  <div class="tab-pane fade show active" id="tabs-equpment" role="tabpanel" aria-labelledby="tabs-equpment-tab">
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        ID Equipment
                      </label>
                      <input
                        disabled
                        value={formik.values.id_equipment}
                        type='text'
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                        id='id_equipment'
                        placeholder='ID Equipment'
                      />
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Equipment Name
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.equip_nama}
                          type='text'
                          className={`${formik.touched.equip_nama && formik.errors.equip_nama ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='equip_nama'
                          placeholder='Equipment name'
                        />
                        {
                          formik.touched.equip_nama && formik.errors.equip_nama && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                            {formik.errors.equip_nama}
                          </p>
                        }
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
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        type='textarea'
                        className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                        id='description'
                        rows='3'
                        placeholder='Description'
                      />
                    </div>
                  </div>
                  <div class="tab-pane fade" id="tabs-part" role="tabpanel" aria-labelledby="tabs-part-tab">
                    <div className='tw-flex tw-gap-6'>
                      <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                        <label
                          htmlFor='exampleInputEmail2'
                          className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                        >
                          Name
                        </label>
                        <div className='tw-relative'>
                          <input
                            onChange={formikPart.handleChange}
                            value={formikPart.values.part_nama}
                            type='text'
                            className={`${formikPart.touched.part_nama && formikPart.errors.part_nama ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id='part_nama'
                            name="part_nama"
                            placeholder='Name'
                          />
                          {
                            (formikPart.touched.part_nama && formikPart.errors.part_nama) &&
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikPart.errors.part_nama}
                            </p>
                          }
                        </div>
                      </div>
                      <div className='tw-form-group tw-mb-2 tw-w-1/2'>
                        <label
                          htmlFor='exampleInputEmail2'
                          className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                        >
                          Description
                        </label>
                        <div className='tw-relative'>
                          <select
                            onChange={formikPart.handleChange}
                            value={formikPart.values.description}
                            id='description'
                            className={`${formikPart.touched.part_nama && formikPart.errors.part_nama ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            aria-label='Default select example'
                          >
                            <option value='' disabled>
                              Pilih
                            </option>
                            <option value='Rotating Part'>Rotating Part</option>
                            <option value='Static Part'>Static Part</option>
                            <option value='Consumable Part'>Consumable Part</option>
                          </select>
                          {
                            formikPart.touched.description && formikPart.errors.description && <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikPart.errors.description}
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={formikPart.handleSubmit}
                      type='button'
                      className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    >
                      Add Part
                    </button>
                    {
                      formik.values.equipmen.length > 0 &&
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
                                Part Name
                              </th>
                              <th
                                scope='tw-col'
                                className='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left'
                              >
                                Type Part
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
                              formik.values.equipmen.map((i, idx) => {
                                return (
                                  <tr
                                    key={idx}
                                    className='tw-border-b hover:tw-bg-sky-100'
                                  >
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12'>
                                      {idx + 1}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                      {i.part_nama}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3'>
                                      {i.description}
                                    </td>
                                    <td className='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap'>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault()
                                          removeListPart(idx)
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
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer tw-relative tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              {
                (formik.touched.equipmen && formik.errors.equipmen) &&
                <p className='tw-absolute tw-text-red-500 tw-left-6 tw-top-4 tw-m-0 tw-text-xs'>
                  {formik.errors.equipmen}
                </p>
              }
              <button
                onClick={() => {
                  formik.resetForm({ values: '' })
                  formikPart.resetForm({ values: '' })
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

export default ModalTambah
