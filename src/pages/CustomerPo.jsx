import React, { useState, memo } from 'react'
import {
    textFilter,
    selectFilter,
    customFilter,
    FILTER_TYPES
} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import AksiFormatter from '../components/customer_po/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/customer_po/ModalTambah'
import ModalEdit from '../components/customer_po/ModalEdit'
import ModalDetail from '../components/customer_po/ModalDetail'
import ModalRemove from '../components/customer_po/ModalRemove'
import MyTable from '../components/tabel/MyTable'
const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const CustomerPo = () => {
    console.log('====================================')
    console.log('page customer-po')
    console.log('====================================')

    const data = [
    ]

    const [isHiden, setIsHiden] = useState({
        idPo: false,
        poNum: false,
        customer: false,
        subject: true,
        value: true,
    })

    const [valAksi, setValAksi] = useState({
        idPo: '',
        poNum: '',
        customer: '',
        subject: '',
        value: '',
    })

    const defaultToggleColumn = (toggleVal, columnField) => {
        setIsHiden(isHiden => ({
            ...isHiden,
            [columnField]: !toggleVal
        }))
    }

    const conditionHidden = (column) => {
        return (
            column.text !== '#' &&
            column.text !== 'Nama' &&
            column.text !== 'Aksi'
        )
    }

    const showModalHandler = (type, row = null) => {
        console.log('====================================')
        console.log(type)
        console.log('====================================')
        let elModal = null
        if (row !== null) {
            setValAksi(valAksi => ({
                ...valAksi,
                id: row.id,
                idPo: row.idPo,
                poNum: row.poNum,
                customer: row.customer,
                subject: row.subject,
                value: row.value,

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
            const modal = window.Modal.getOrCreateInstance(elModal)
            modal.show()
        }
    }

    const selectOptions = [{ value: 'Electrical', label: 'Electrical' }]

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
            dataField: 'idPo',
            text: 'ID PO',
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'poNum',
            text: 'PO Num',
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.customer,
            dataField: 'customer',
            text: 'Customer',
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '100px' })
        },
        {
            hidden: isHiden.subject,
            dataField: 'subject',
            text: 'Subject',
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '100px' })
        },
        {
            hidden: isHiden.value,
            dataField: 'value',
            text: 'Value',
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
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
    }

    const options = {
        // sizePerPage: 3,
        custom: true,
        totalSize: data.length,
        pageButtonRenderer: (pageProps) => {
            return <PageButtonRenderer key={pageProps.page} pageProps={pageProps} onPageChange={onPageChange} />
        },
        sizePerPageRenderer: SizePerPageRenderer
    }

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
                />
            </div>
            <ModalTambah />
            <ModalEdit valAksi={valAksi} />
            <ModalDetail />
            <ModalRemove />
        </>
    )
}


export default memo(CustomerPo)
