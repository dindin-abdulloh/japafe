import React from 'react'

const CustomSearch = () => {
    return (
        <div>
            <input
                type='search'
                className='tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                placeholder='Search...'
            />
        </div>
    )
}

export default CustomSearch