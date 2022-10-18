import React from 'react'
import { MdDescription, MdCreate, MdDelete } from 'react-icons/md'

const AksiFormatter = ({ row, showModalHandler }) => {
  return (
    <>
      <div className='tw-flex tw-gap-2 tw-items-center tw-w-full'>
      <button
          onClick={() => {
            showModalHandler('detail', row)
          }}
          className='tw-w-[55px] tw-bg-[#08B382] tw-rounded-md tw-h-[26px] tw-text-[#FFFFFF] tw-text-[14px]'
        >
          View
        </button>
        <button
          onClick={() => {
            showModalHandler('edit', row)
          }}
          className='tw-bg-[#E9787A] tw-rounded-md tw-text-[#FFFFFF] tw-text-[14px] tw-w-[55px] tw-h-[26px]'
        >
          Edit
        </button>
        <button
          onClick={() => {
            showModalHandler('remove', row)
          }}
          className='hover:tw-text-gray-700 tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out'
        >
          <MdDelete size={18} />
        </button>
      </div>
    </>
  )
}

export default AksiFormatter
