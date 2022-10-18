import React, { useEffect } from 'react'
import {MdPrint} from 'react-icons/md'
import { MdOutlineFilterAlt } from 'react-icons/md'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
  // SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator'
import overlayFactory from 'react-bootstrap-table2-overlay/dist/react-bootstrap-table2-overlay';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import CustomToggleColumn from './CustomToggleColumn'
// import CustomSearch from './CustomSearch'
const MyTable = ({
  data,
  columns,
  expandRow,
  options,
  defaultToggleColumn,
  showModalHandler,
  conditionHidden,
  loading = false,
  remote = false,
  add = true,
  searchHandler
}) => {
  useEffect(() => {
    const container = document.querySelector('.table-isScroll')

    let startY
    let startX
    let scrollLeft
    let scrollTop
    let isDown

    container.addEventListener('mousedown', e => mouseIsDown(e))
    container.addEventListener('mouseup', e => mouseUp(e))
    container.addEventListener('mouseleave', e => mouseLeave(e))
    container.addEventListener('mousemove', e => mouseMove(e))

    function mouseIsDown(e) {
      isDown = true
      startY = e.pageY - container.offsetTop
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
      scrollTop = container.scrollTop
    }
    function mouseUp(e) {
      isDown = false
    }
    function mouseLeave(e) {
      isDown = false
    }
    function mouseMove(e) {
      if (isDown) {
        e.preventDefault()
        const y = e.pageY - container.offsetTop
        const walkY = y - startY
        container.scrollTop = scrollTop - walkY
        const x = e.pageX - container.offsetLeft
        const walkX = x - startX
        container.scrollLeft = scrollLeft - walkX
      }
    }
  }, [])


  return (
    <ToolkitProvider
      keyField='id'
      data={data}
      columns={columns}
      columnToggle
      search
    >
      {props => {
        return (
          <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <div className='tw-flex tw-items-center tw-justify-between tw-mb-2 tw-mt-[20px]'>
                  {
                    add && <div className='tw-flex tw-items-center tw-gap-2'>
                      <input
                        onChange={searchHandler}
                        type='search'
                        className='tw-form-control tw-block tw-w-[582px] tw-px-4 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-[#F5F6FA] tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded-full tw-h-[48px] tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                        placeholder='Search...'
                      />
                     
                      {/* <SizePerPageDropdownStandalone {...paginationProps} /> */}
                    </div>
                  }

                  {
                    add && <div className='tw-flex tw-items-center tw-gap-2 tw-mt-[20px]'>
                      <button
                        type='button'
                        className='tw-flex tw-gap-1 hover:tw-bg-gray-100 tw-rounded tw-p-2 tw-items-center tw-font-bold tw-text-xs tw-duration-150 tw-ease-in-out'
                      >
                        <MdPrint  size={16} />
                        <span className='tw-text-[#202020] tw-text-[16px] tw-font-[400]'>Print</span>
                      </button>
                      <div className='dropstart tw-relative'>
                        <button
                          id='dropdownColumnToggle'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                          type='button'
                          className='hover:tw-text-gray-500 hover:tw-bg-gray-200 tw-rounded-full tw-p-2 tw-relative tw-flex tw-gap-1 tw-items-center tw-font-bold tw-duration-150 tw-ease-in-out'
                        >
                          {/* <MdSettings
                            size={16}
                            className='tw-rotate-0 hover:tw-rotate-180 tw-transition-all tw-duration-300'
                          /> */}
                          <MdOutlineFilterAlt/>
                          <span className='tw-text-[#202020] tw-text-[16px] tw-font-[400]'>Filter</span>
                        </button>
                        <CustomToggleColumn
                          {...props.columnToggleProps}
                          defaultToggleColumn={defaultToggleColumn}
                          conditionHidden={conditionHidden}
                        />
                      </div>

                      <button
                        onClick={() => {
                          showModalHandler('tambah')
                        }}
                        type='button'
                        className='tw-w-[170px] tw-h-[47px] tw-bg-[#E9787A] tw-rounded-full tw-text-[14px] tw-font-semibold tw-text-[#FFFFFF] hover:tw-bg-red-500'
                      >
                        + New Customer
                      </button>
                    </div>
                  }
                </div>

                <div className='tw-mt-[46px]'>
                  <BootstrapTable
                    remote={remote}
                    wrapperClasses='tw-overflow-x-auto table-isScroll tw-cursor-default'
                    classes='tw-m-0 tw-border-none'
                    // headerWrapperClasses='tw-relative'
                    headerClasses='tw-text-sm'
                    bodyClasses='tw-text-sm digiTable'
                    hover={true}
                    loading={loading}
                    {...props.baseProps}
                    expandRow={expandRow}
                    filter={filterFactory()}
                    noDataIndication='Table is Empty'
                    {...paginationTableProps}
                    overlay={overlayFactory({ spinner: true, styles: { overlay: (base) => ({ ...base, background: 'rgba(255, 255, 255, 0.5)', border: 'red', zIndex: 0 }) } })}
                  />
                </div>

                <div className='tw-mt-2 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between'>
                  <div className='tw-text-xs'>
                    <PaginationTotalStandalone {...paginationProps} />
                  </div>
                  <div className='tw-text-xs tw-mt-2 md:tw-mt-0'>
                    {
                      data.length > 0 && <PaginationListStandalone {...paginationProps} />
                    }
                  </div>
                </div>
              </div>
            )}
          </PaginationProvider>
        )
      }}
    </ToolkitProvider>
  )
}

export default MyTable
