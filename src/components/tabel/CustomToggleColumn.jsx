import React from 'react'

const CustomToggleColumn = ({
  columns,
  onColumnToggle,
  toggles,
  defaultToggleColumn,
  conditionHidden
}) => {
  return (
    <ul
      aria-labelledby='dropdownColumnToggle'
      className=' dropdown-menu tw-min-w-max tw-w-fit tw-absolute tw-bg-white tw-text-base tw-float-left tw-py-2 tw-list-none tw-text-left tw-rounded tw-shadow-lg tw-mt-1 tw-hidden tw-m-0 tw-bg-clip-padding tw-border tw-border-solid'
    >
      {columns.map(column => {
        if (conditionHidden(column)) {
          return (
            <li
              key={column.dataField}
              onClick={e => {
                e.stopPropagation()
              }}
              className='hover:tw-bg-gray-100 tw-px-2 tw-transition tw-duration-300 tw-ease-in-out'
            >
              <div className='tw-relative tw-form-check tw-flex tw-items-center tw-text-sm tw-py-2 tw-px-2 tw-font-normal tw-w-full tw-whitespace-nowrap tw-bg-transparent tw-text-gray-700 tw-cursor-pointer'>

                <input
                  onChange={() => {
                    onColumnToggle(column.dataField)
                    defaultToggleColumn(
                      toggles[column.dataField],
                      column.dataField
                    )
                  }}
                  className='tw-form-check-input tw-appearance-none tw-h-4 tw-w-4 tw-border tw-border-gray-300 tw-rounded tw-bg-white checked:tw-bg-sky-600 checked:tw-border-sky-600 focus:tw-outline-none tw-transition tw-duration-200 tw-mt-[1px] tw-align-top tw-bg-no-repeat tw-bg-center tw-bg-contain tw-float-left tw-mr-2 tw-cursor-pointer'
                  type='checkbox'
                  value=''
                  id={column.dataField}
                  checked={toggles[column.dataField]}
                />
                <label
                  className='tw-form-check-label tw-m-0 tw-inline-block tw-text-gray-700'
                  htmlFor='flexCheckDefault'
                >
                  {column.text}
                </label>
              </div>
            </li>
          )
        }
      })}
    </ul>
  )
}

export default CustomToggleColumn
