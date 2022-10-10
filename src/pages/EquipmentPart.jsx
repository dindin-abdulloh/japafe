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
import AksiFormatter from '../components/equipmentPart/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/equipmentPart/ModalTambah'
import ModalEdit from '../components/equipmentPart/ModalEdit'
import ModalDetail from '../components/equipmentPart/ModalDetail'
import ModalRemove from '../components/equipmentPart/ModalRemove'
import MyTable from '../components/tabel/MyTable'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getEquipmentPart, setSuccess } from '../store/slices/equipmentPartSlice'
const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const EquipmnetPart = () => {
    console.log('====================================')
    console.log('page equipmentPart')
    console.log('====================================')

    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const dispatch = useDispatch()
    const { data, limit, totalData, currentPage, isLoading } = useSelector(state => state.equipmentPartSlice.dataEquipmentPart)

    const [val, setVal] = useState({
        createID: ''
    })

    const [isHiden, setIsHiden] = useState({
        id_equipment: false,
        equip_nama: false,
        description: false,
    })

    const [valAksi, setValAksi] = useState({
        id_equipment: '',
        equip_nama: '',
        description: '',
        equipment: ''
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
            column.text !== 'ID Equipment' &&
            column.text !== 'Equipment name' &&
            column.text !== 'Aksi'
        )
    }

    const showModalHandler = (type, row = null) => {
        let elModal = null
        if (row !== null) {
            setValAksi(valAksi => ({
                ...valAksi,
                id: row.id,
                id_equipment: row.id_equipment,
                equip_nama: row.equip_nama,
                description: row.description,
                equipment: row.equipmen

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
                createID: `EQ${moment(nowDate).format('MDDYYYYHHmmss')}`
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
            sort: false,
            headerStyle: () => ({ width: '50px' }),
            formatter: (cell, row, rowIndex, formatExtraData) => {
                const current = currentPage
                const rowNumber = (current - 1) * 10 + (rowIndex + 1)
                return rowNumber
            }
        },
        {
            dataField: 'id_equipment',
            text: 'ID Equipment',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'equip_nama',
            text: 'Equipment name',
            headerStyle: () => ({ width: '180px' })
        },
        {
            hidden: isHiden.description,
            dataField: 'description',
            text: 'Description',
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
    //                 data={row.equipmen}
    //                 columns={[
    //                     {
    //                         dataField: 'part_nama',
    //                         text: 'Part name'
    //                     },
    //                     {
    //                         dataField: 'description',
    //                         text: 'Type'
    //                     }
    //                 ]}
    //             />
    //         )
    //     },
    //     showExpandColumn: false
    // }

    const onPageChange = (page) => {
        dispatch(getEquipmentPart({ page: page, perPage: '10', token: token }))
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
        dispatch(getEquipmentPart({ token: token }))
    }, [])

    useEffect(() => {
        console.log(totalData);
    }, [data])

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
            <ModalEdit valAksi={valAksi} />
            <ModalDetail valAksi={valAksi} />
            <ModalRemove />
        </>
    )
}


export default memo(EquipmnetPart)
