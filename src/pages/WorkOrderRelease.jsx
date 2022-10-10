import React, { useState, memo, useCallback, useEffect, useLayoutEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next/dist/react-bootstrap-table-next'
import {
    textFilter,
    selectFilter,
    customFilter,
    FILTER_TYPES
} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import AksiFormatter from '../components/workOrderRelease/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/workOrderRelease/ModalTambah'
import ModalEdit from '../components/workOrderRelease/ModalEdit'
import ModalDetail from '../components/workOrderRelease/ModalDetail'
import ModalRemove from '../components/workOrderRelease/ModalRemove'
import MyTable from '../components/tabel/MyTable'
import { useDispatch, useSelector } from 'react-redux'
import { setValueAksi, getWorkOrderRelease, setSuccess } from '../store/slices/workOrderReleaseSlice'
import moment from 'moment'
const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const WorkOrderRelease = () => {
    console.log('====================================')
    console.log('page workOrderRelease')
    console.log('====================================')
    const [val, setVal] = useState({
        createID: ''
    })

    const { data, limit, totalData, currentPage, isLoading } = useSelector(
        state => state.workOrderReleaseSlice.dataWorkOrderRelease
    )

    const [token, setToken] = useState(sessionStorage.getItem('token'))
    const dispatch = useDispatch()
    const valueAksi = useSelector(state => state.workOrderReleaseSlice.valueAksi)

    const [isHiden, setIsHiden] = useState({
        job: false,
        nama_cus: false,
        address: true,
    })

    const [valAksi, setValAksi] = useState({
        job: '',
        nama_cus: '',
        address: ''
    })

    const defaultToggleColumn = (toggleVal, columnField) => {
        setIsHiden(isHiden => ({
            ...isHiden,
            [columnField]: !toggleVal
        }))
    }

    const conditionHidden = column => {
        return (
            column.text !== '#' &&
            column.text !== 'Job no' &&
            column.text !== 'Customer' &&
            column.text !== 'Aksi'
        )
    }

    const showModalHandler = useCallback(
        (type, row = null) => {
            let elModal = null
            if (row !== null) {
                setValAksi(valAksi => ({
                    ...valAksi,
                    job: row.job,
                    nama_cus: row.nama_cus,
                    address: row.address
                }))
            }

            switch (type) {
                case 'tambah':
                    elModal = document.querySelector(`#${type}`)
                    break
                case 'detail':
                    elModal = document.querySelector(`#${type}`)
                    break
                case 'edit':
                    elModal = document.querySelector(`#${type}`)
                    break
                case 'remove':
                    elModal = document.querySelector(`#${type}`)
                    break

                default:
                    break
            }
            if (elModal !== null) {
                const nowDate = new Date()
                setVal(val => ({
                    ...val,
                    createID: moment(nowDate).format('YY.HHmmss')
                }))
                const modal = window.Modal.getOrCreateInstance(elModal)
                modal.show()
            }
        },
        [valAksi]
    )

    const columns = [
        {
            dataField: 'no',
            text: '#',
            sort: false,
            headerStyle: () => ({ width: '50px' }),
            formatter: (cell, row, rowIndex, formatExtraData) => {
                const currentPage = 1
                const rowNumber = (currentPage - 1) * 10 + (rowIndex + 1)
                return rowNumber
            }
        },
        {
            dataField: 'job',
            text: 'Job no',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'nama_cus',
            text: 'Customer',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.address,
            dataField: 'address',
            text: 'Address',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'aksi',
            text: 'Action',
            headerStyle: () => ({ width: '100px' }),
            formatter: (cell, row) => {
                return <AksiFormatter row={row} showModalHandler={showModalHandler} />
            }
        }
    ]

    const expandRow = {
        className: 'tw-bg-gray-200',
        renderer: row => (
            <div className='tw-flex tw-gap-3'>
                <button
                    type='button'
                    className='hover:tw-bg-red-600 tw-inline-block tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    data-bs-dismiss='modal'
                >
                    Smry
                </button>
                <button
                    type='button'
                    className='hover:tw-bg-red-600 tw-inline-block tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    data-bs-dismiss='modal'
                >
                    T.Sch
                </button>
                <button
                    type='button'
                    className='hover:tw-bg-red-600 tw-inline-block tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    data-bs-dismiss='modal'
                >
                    Draw
                </button>
                <button
                    type='button'
                    className='hover:tw-bg-red-600 tw-inline-block tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    data-bs-dismiss='modal'
                >
                    Disp
                </button>
                <button
                    type='button'
                    className='hover:tw-bg-red-600 tw-inline-block tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    data-bs-dismiss='modal'
                >
                    Cost
                </button>
                <button
                    type='button'
                    className='hover:tw-bg-red-600 tw-inline-block tw-px-3 tw-py-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                    data-bs-dismiss='modal'
                >
                    Man Hour
                </button>
            </div>
        )
    }

    const onPageChange = page => { }

    const options = {
        // sizePerPage: 3,
        custom: true,
        totalSize: data.length,
        pageButtonRenderer: pageProps => {
            return (
                <PageButtonRenderer
                    key={pageProps.page}
                    pageProps={pageProps}
                    onPageChange={onPageChange}
                />
            )
        },
        sizePerPageRenderer: SizePerPageRenderer
    }

    useLayoutEffect(() => {
        dispatch(getWorkOrderRelease({ token: 'token' }))
    }, [])

    useEffect(() => {
        return () => {
            dispatch(setSuccess(false))
        }
    }, [])

    return (
        <>
            <div className='tw-bg-white tw-p-3 tw-rounded-lg'>
                <MyTable
                    remote={true}
                    data={data}
                    columns={columns}
                    options={options}
                    defaultToggleColumn={defaultToggleColumn}
                    showModalHandler={showModalHandler}
                    conditionHidden={conditionHidden}
                    expandRow={{}}
                />
            </div>
            <ModalTambah val={val} token={token} />
            <ModalEdit valAksi={valAksi} />
            <ModalDetail valAksi={valAksi} />
            <ModalRemove />
        </>
    )
}

export default memo(WorkOrderRelease)
