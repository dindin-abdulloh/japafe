import React, { useState, memo, useLayoutEffect, useEffect } from 'react'
// import BootstrapTable from 'react-bootstrap-table-next'
import {
    textFilter,
    selectFilter,
    customFilter,
    FILTER_TYPES
} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import AksiFormatter from '../components/supplier/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/supplier/ModalTambah'
import ModalEdit from '../components/supplier/ModalEdit'
import ModalDetail from '../components/supplier/ModalDetail'
import ModalRemove from '../components/supplier/ModalRemove'
import MyTable from '../components/tabel/MyTable'
import { useDispatch, useSelector } from 'react-redux'
import { getSupplier, setSuccess } from '../store/slices/supplierSlice'
import moment from 'moment'

const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const Supplier = () => {
    // console.log('====================================')
    // console.log('page supplier')
    // console.log('====================================')
    const [val, setVal] = useState({
        createID: ''
    })

    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const dispatch = useDispatch()
    const { data, limit, totalData, currentPage, isLoading } = useSelector(
        state => state.supplierSlice.dataSupplier
    )

    const [isHiden, setIsHiden] = useState({
        npwp: true,
        alamat: false,
        kota: true,
        phone: false,
        email: true,
        bank_akun: true,
        akun_name: true,
        akun_number: true,
        contact_person_sup: false,
        ppn: true,
        pph: true,
    })

    const [valAksi, setValAksi] = useState({
        id: '',
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
            column.text !== 'Type' &&
            column.text !== 'Name Supplier' &&
            column.text !== 'Aksi'
        )
    }

    const showModalHandler = (type, row = null) => {
        // console.log('====================================')
        // console.log(type)
        // console.log('====================================')
        let elModal = null
        if (row !== null) {
            setValAksi(valAksi => ({
                ...valAksi,
                id: row.id,
                suplier_type: row.suplier_type,
                id_suplier: row.id_suplier,
                sup_name: row.sup_name,
                alamat: row.alamat,
                kota: row.kota,
                phone: row.phone,
                email: row.email,
                bank_akun: row.bank_akun,
                akun_name: row.akun_name,
                akun_number: row.akun_number,
                contact_person_sup: row.contact_person_sup,
                ppn: row.ppn,
                pph: row.pph,
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
                createID: `SL${moment(nowDate).format('MDDYYYYHHmmss')}`
            }))
            dispatch(setSuccess(false))
            const modal = window.Modal.getOrCreateInstance(elModal)
            modal.show()
        }
    }

    const selectOptions = [
        { value: 'Material Supplier', label: 'Material Supplier' },
        { value: 'Service Vendor', label: 'Service Vendor' }
    ]

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
        {
            dataField: 'suplier_type',
            text: 'Type',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'sup_name',
            text: 'Name Supplier',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.alamat,
            dataField: 'alamat',
            text: 'Address',
            headerStyle: () => ({ width: '250px' })
        },
        {
            hidden: isHiden.kota,
            dataField: 'kota',
            text: 'City',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.phone,
            dataField: 'phone',
            text: 'Office Phone',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.email,
            dataField: 'email',
            text: 'Office Email',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.contact_person_sup,
            dataField: 'contact_person_sup',
            text: 'Contact Person',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.bank_akun,
            dataField: 'bank_akun',
            text: 'Bank Name',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.akun_name,
            dataField: 'akun_name',
            text: 'Account Name',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.akun_number,
            dataField: 'akun_number',
            text: 'Account Number',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.ppn,
            dataField: 'ppn',
            text: 'PPN',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.pph,
            dataField: 'pph',
            text: 'PPh',
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
        //             onFilter(date)
        //         }
        //         return (
        //             <div className=''>
        //                 <MyDatePicker
        //                     formClassName={`form-control tw-w-full tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none`}
        //                     handleOnChange={handleOnChange}
        //                     format={`M/DD/YYYY`}
        //                 />
        //             </div>
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

    // const expandRow = {
    //     onlyOneExpanding: true,
    //     className: 'tw-bg-gray-200',
    //     renderer: row => {
    //         return (
    //             <BootstrapTable
    //                 keyField='id'
    //                 classes='m-0'
    //                 data={[
    //                     {
    //                         nama: 'andri',
    //                         telp: '080087996'
    //                     }
    //                 ]}
    //                 columns={[
    //                     {
    //                         dataField: 'nama',
    //                         text: 'Nama'
    //                     },
    //                     {
    //                         dataField: 'telp',
    //                         text: 'Telephone'
    //                     }
    //                 ]}
    //             />
    //         )
    //     },
    //     showExpandColumn: false
    // }

    const onPageChange = (page) => {
        dispatch(getSupplier({ page: page, perPage: '10', token: token }))
    }

    const options = {
        custom: true,
        sizePerPage: limit,
        page: currentPage,
        totalSize: totalData,
        pageButtonRenderer: (pageProps) => {
            return <PageButtonRenderer key={pageProps.page} pageProps={pageProps} onPageChange={onPageChange} />
        },
        sizePerPageRenderer: SizePerPageRenderer
    }

    useLayoutEffect(() => {
        dispatch(getSupplier({ token: token }))
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
            <ModalEdit valAksi={valAksi} token={token} />
            <ModalDetail valAksi={valAksi} token={token} />
            <ModalRemove valId={valAksi.id} token={token} />
        </>
    )
}

export default memo(Supplier)
