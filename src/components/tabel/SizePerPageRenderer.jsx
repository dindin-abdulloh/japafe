import React, { useState } from 'react'

const SizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => {
  return (
    <select
      onChange={e => {
        onSizePerPageChange(e.target.value)
      }}
      className='tw-form-select tw-form-select-sm tw-appearance-none tw-block tw-w-16 tw-px-2 tw-py-1 tw-text-sm tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-bg-no-repeat tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
      aria-label='.form-select-sm example'
    >
      {options.map(option => {
        return (
          <option key={option.text} value={option.page}>
            {option.text}
          </option>
        )
      })}
    </select>
  )
}

export default SizePerPageRenderer
