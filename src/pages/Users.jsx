import React, {useState, memo } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import {
    textFilter,
    selectFilter,
    customFilter,
    FILTER_TYPES
} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import AksiFormatter from '../components/users/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/users/ModalTambah'
import ModalEdit from '../components/users/ModalEdit'
import ModalDetail from '../components/users/ModalDetail'
import ModalRemove from '../components/users/ModalRemove'
import MyTable from '../components/tabel/MyTable'
const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const data = [
    {
        id: 'e8f796c3-0f1a-4fd0-9a85-1baa3a10e8ee',
        quotId: '148/Q-JAPA/VII/2022',
        quotNum: 'QU202208063',
        customer: 'CV. Presisindo Utama Indonesia - ,Bandung',
        contact: 'Bp. Alan',
        address: 'Sekejati No. 40 RT 001 RW 010 Sukapura, Kiara Condong - Bandung',
        city: 'Bandung',
        created_at: '6/7/2022',
        items: [
            {
                itemOfWork: 'Balancing Rotor Turbine',
                volume: '1',
                unit: 'Lot'
            }
        ]
    },
]


const Users = () => {
    console.log('====================================')
    console.log('page users')
    console.log('====================================')

    const [isHiden, setIsHiden] = useState({
        quotId: true,
        quotNum: false,
        customer: false,
        contact: false,
        address: true,
        city: true,
        created_at: false
    })

    const [valAksi, setValAksi] = useState({
        id: '',
        quotId: '',
        quotNum: '',
        customer: '',
        contact: '',
        address: '',
        city: '',
        items: [],
        created_at: ''
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
        // console.log(type)
        console.log(row);
        console.log('====================================')
        let elModal = null
        if (row !== null) {
            setValAksi(valAksi => ({
                ...valAksi,
                id: row.id,
                quotId: row.quotId,
                quotNum: row.quotNum,
                customer: row.customer,
                contact: row.contact,
                address: row.address,
                city: row.city,
                items: row.items,
                created_at: row.created_at
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
            const modal = new window.Modal(elModal)
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
            hidden: isHiden.quotId,
            dataField: 'quotId',
            text: 'Quot ID',
            sort: true,
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'quotNum',
            text: 'Quot Number',
            sort: true,
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'customer',
            text: 'Customer',
            sort: true,
            filter: selectFilter({
                placeholder: 'Pilih',
                options: selectOptions,
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.contact,
            dataField: 'contact',
            text: 'Contact',
            sort: true,
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.address,
            dataField: 'address',
            text: 'Adress',
            sort: true,
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.city,
            dataField: 'city',
            text: 'City',
            sort: true,
            filter: textFilter({
                placeholder: ' ',
                className: classNameFilterForm
            }),
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.created_at,
            dataField: 'created_at',
            text: 'Date',
            sort: true,
            filter: customFilter({
                type: FILTER_TYPES.TEXT
            }),
            filterRenderer: (onFilter, column) => {
                const handleOnChange = date => {
                    // onFilter(date)
                }
                return (
                    <MyDatePicker
                        formClassName={`form-control tw-w-full tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none`}
                        handleOnChange={handleOnChange}
                        format={`M/DD/YYYY`}
                    />
                )
            },
            headerStyle: () => ({ width: '150px' })
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

    const options = {
        // sizePerPage: 3,
        custom: true,
        totalSize: data.length,
        // firstPageText: 'First',
        // prePageText: 'Back',
        // nextPageText: 'Next',
        // lastPageText: 'Last',
        // nextPageTitle: 'First page',
        // prePageTitle: 'Pre page',
        // firstPageTitle: 'Next page',
        // lastPageTitle: 'Last page',
        // pageButtonRenderer: PageButtonRenderer,
        // sizePerPageRenderer: SizePerPageRenderer
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
                    expandRow={expandRow}
                />
            </div>
            <ModalTambah />
            <ModalEdit valAksi={valAksi} />
            <ModalDetail valAksi={valAksi} />
            <ModalRemove />
        </>
    )
}


export default memo(Users)
