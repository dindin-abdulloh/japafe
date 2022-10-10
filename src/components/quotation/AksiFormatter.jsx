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
          className='hover:tw-text-gray-700 tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out'
        >
          <MdDescription size={18} />
        </button>
        <button
          onClick={() => {
            showModalHandler('edit', row)
          }}
          className='hover:tw-text-gray-700 tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out'
        >
          <MdCreate size={18} />
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
