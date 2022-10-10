import React, { useState, memo, useRef, useEffect, useLayoutEffect } from 'react'
import {
    textFilter,
    selectFilter,
    customFilter,
    FILTER_TYPES
} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import AksiFormatter from '../components/sales_performance/AksiFormatter'
import PageButtonRenderer from '../components/tabel/PageButtonRenderer'
import SizePerPageRenderer from '../components/tabel/SizePerPageRenderer'
import MyDatePicker from '../components/data_picker/MyDatePicker'
import ModalTambah from '../components/sales_performance/ModalTambah'
import ModalEdit from '../components/sales_performance/ModalEdit'
import ModalDetail from '../components/sales_performance/ModalDetail'
import ModalRemove from '../components/sales_performance/ModalRemove'
import MyTable from '../components/tabel/MyTable'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
          onClick: null
        }  
      }
};

const classNameFilterForm =
    'tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none'

const SalesPerformance = () => {
    console.log('====================================')
    console.log('page sales_performance')
    console.log('====================================')

    const chartBarRef = useRef(null)
    const [_dataBar, setDataBar] = useState([])



    const data = [
    ]

    const [isHiden, setIsHiden] = useState({
        prepare: false,
        pic: false,
        customer: false,
        description: true,
        value: true,
        status: true,
    })

    const [valAksi, setValAksi] = useState({
        prepare: '',
        pic: '',
        customer: '',
        description: '',
        value: '',
        status: '',
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
            column.text !== 'Prepare' &&
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
                prepare: row.prepare,
                pic: row.pic,
                customer: row.customer,
                description: row.description,
                value: row.value,
                status: row.status,

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
            dataField: 'periode',
            text: 'Periode',
            headerStyle: () => ({ width: '180px' })
        },
        {
            dataField: 'contactValue',
            text: 'Contact Value',
            headerStyle: () => ({ width: '180px' })
        },
    ]

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


    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    const dataBar = {
        labels: labels,
        datasets: [
            {
                label: 'Contract Value',
                backgroundColor: "rgb(239 68 68)",
                hoverBackgroundColor: "rgb(220 38 38)",
                borderColor: "rgb(6 148 162)",
                data: [0, 100000, 500000, 200000, 200000, 300000, 45000, 550000, 470000, 70000, 58000, 750000],
            },
        ],
    };

    // useEffect(() => {
    //     setDataBar([0, 100000, 500000, 200000, 200000, 300000, 45000, 550000, 470000, 70000, 58000, 750000])
    // },[])



    return (
        <>
            <div className='tw-bg-white tw-p-3 tw-rounded-lg'>
                <div className='tw-px-6 tw-py-6'>
                    <Bar options={optionsBar} data={dataBar} height={"470"} />
                </div>
                <MyTable
                    add={false}
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


export default memo(SalesPerformance)
