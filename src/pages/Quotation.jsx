import React, { useState, memo, useLayoutEffect, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import {
    textFilter,
    selectFilter,
    customFilter,
    FILTER_TYPES
} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import AksiFormatter from '../components/quotation/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/quotation/ModalTambah'
import ModalEdit from '../components/quotation/ModalEdit'
import ModalDetail from '../components/quotation/ModalDetail'
import ModalRemove from '../components/quotation/ModalRemove'
import MyTable from '../components/tabel/MyTable'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotation, setSuccess } from '../store/slices/quotationSlice'
import moment from 'moment'
const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const Quotation = () => {
    const [val, setVal] = useState({
        createID: ''
    })
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const dispatch = useDispatch()
    const { data, limit, totalData, currentPage, isLoading } = useSelector(
        state => state.quotationSlice.dataQuotation
    )

    const [isHiden, setIsHiden] = useState({
        quo_number: false,
        cus_id: false,
        address: true,
        city: true,
        contact: false,
        description: true,
        tanggal_quo: true
    })

    const [valAksi, setValAksi] = useState({
        id: '',
        quo_number: '',
        address: '',
        city: '',
        contact: '',
        description: '',
        tanggal_quo: ''
    })

    const defaultToggleColumn = (toggleVal, columnField) => {
        setIsHiden(isHiden => ({
            ...isHiden,
            [columnField]: !toggleVal
        }))
    }

    const conditionHidden = column => {
        return (
            column.text !== '#' && column.text !== 'Quot Number' && column.text !== 'Aksi'
        )
    }

    const showModalHandler = (type, row = null) => {
        let elModal = null
        if (row !== null) {
            setValAksi(valAksi => ({
                ...valAksi,
                id: row.id,
                quo_number: row.quo_number,
                address: row.address,
                city: row.city,
                contact: row.contact,
                description: row.description,
                tanggal_quo: row.tanggal_quo,
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
            setVal((val) => ({
                ...val,
                createID: `QU${moment(nowDate).format('MDDYYYYHHmmss')}`
            }))
            dispatch(setSuccess(false))
            const modal = window.Modal.getOrCreateInstance(elModal)
            modal.show()
        }
    }

    const selectOptions = [{ value: 'Electrical', label: 'Electrical' }]

    const columns = [
        {
            dataField: 'no',
            text: '#',
            headerStyle: () => ({ width: '50px' }),
            formatter: (cell, row, rowIndex, formatExtraData) => {
                const current = currentPage
                const rowNumber = (currentPage - 1) * 10 + (rowIndex + 1)
                return rowNumber
            }
        },
        // {
        //     hidden: isHiden.quotId,
        //     dataField: 'quotId',
        //     text: 'Quot ID',
        //     sort: true,
        //     filter: textFilter({
        //         placeholder: ' ',
        //         className: classNameFilterForm
        //     }),
        //     headerStyle: () => ({ width: '180px' })
        // },
        {
            dataField: 'quo_number',
            text: 'Quot Number',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'address',
            text: 'Adress',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'tanggal_quo',
            text: 'Date',
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return moment(cell).format('M/DD/YYYY')
            },
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.contact,
            dataField: 'contact',
            text: 'Contact',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.city,
            dataField: 'city',
            text: 'City',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.description,
            dataField: 'description',
            text: 'Description',
            headerStyle: () => ({ width: '180px' })
        },
        // {
        //     hidden: isHiden.created_at,
        //     dataField: 'created_at',
        //     text: 'Date',
        //     sort: true,
        //     filter: customFilter({
        //         type: FILTER_TYPES.TEXT
        //     }),
        //     filterRenderer: (onFilter, column) => {
        //         const handleOnChange = date => {
        //             // onFilter(date)
        //         }
        //         return (
        //             <MyDatePicker
        //                 formClassName={`form-control tw-w-full tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none`}
        //                 handleOnChange={handleOnChange}
        //                 format={`M/DD/YYYY`}
        //             />
        //         )
        //     },
        //     headerStyle: () => ({ width: '150px' })
        // },
        {
            dataField: 'aksi',
            text: 'Aksi',
            headerStyle: () => ({ width: '100px' }),
            formatter: (cell, row) => {
                return <AksiFormatter row={row} showModalHandler={showModalHandler} />
            }
        }
    ]

    const expandRow = {
        onlyOneExpanding: true,
        className: 'tw-bg-gray-100',
        renderer: row => {
            return (
                <BootstrapTable
                    keyField='id'
                    classes='m-0'
                    data={row.items}
                    columns={[
                        {
                            dataField: 'itemOfWork',
                            text: 'Item of work'
                        },
                        {
                            dataField: 'volume',
                            text: 'Volume'
                        },
                        {
                            dataField: 'unit',
                            text: 'Unit'
                        }
                    ]}
                />
            )
        },
        showExpandColumn: false
    }

    const onPageChange = page => {
        dispatch(getQuotation({ page: page, perPage: '10' }))
    }

    const options = {
        custom: true,
        sizePerPage: limit,
        page: currentPage,
        totalSize: totalData,
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
        dispatch(getQuotation({ token: 'token' }))
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
                    data={data}
                    columns={columns}
                    options={options}
                    defaultToggleColumn={defaultToggleColumn}
                    showModalHandler={showModalHandler}
                    conditionHidden={conditionHidden}
                    expandRow={{}}
                    loading={isLoading}
                    remote={true}
                />
            </div>
            <ModalTambah val={val} token={token} />
            {/* <ModalEdit valAksi={valAksi} />
            <ModalDetail valAksi={valAksi} />
            <ModalRemove valId={valAksi.id} /> */}
        </>
    )
}

export default memo(Quotation)
