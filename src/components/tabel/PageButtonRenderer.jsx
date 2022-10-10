import React from 'react'

import { MdFirstPage, MdLastPage } from 'react-icons/md'

const PageButtonRenderer = ({ pageProps, onPageChange }) => {
  const { page, active, disable, title } = pageProps
  const handleClick = e => {
    e.preventDefault()
    onPageChange(page)
  }
  const activeStyle = {}
  if (active) {
    activeStyle.backgroundColor = 'rgb(239 68 68)'
    activeStyle.color = 'white'
  }

  // if (typeof page === 'string') {
  //   // activeStyle.backgroundColor = 'white';
  //   // activeStyle.color = 'black';
  //   console.log(page === '<<')
  // }

  if (page !== 'Next' && page !== '>' && page !== 'Back' && page !== '<') {
    if (page === '>>') {
      return (
        <li key={page}>
          <a
            onClick={handleClick}
            style={activeStyle}
            className='tw-inline-block tw-px-[10px] tw-py-2 tw-mr-1 md:tw-mr-0 tw-ml-1 md:tw-ml-2 hover:tw-bg-gray-200 hover:tw-text-gray-700 tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out tw-cursor-pointer'
          >
            <MdLastPage size={16} />
          </a>
        </li>
      )
    }

    if (page === '<<') {
      return (
        <li key={page}>
          <a
            onClick={handleClick}
            style={activeStyle}
            className='tw-inline-block tw-px-[10px] tw-py-2 tw-mr-1 md:tw-mr-0 tw-ml-1 md:tw-ml-2 hover:tw-bg-gray-200 hover:tw-text-gray-700 tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out tw-cursor-pointer'
          >
            <MdFirstPage size={16} />
          </a>
        </li>
      )
    }

    return (
      <li key={page}>
        <a
          href='#'
          onClick={handleClick}
          style={activeStyle}
          className='tw-inline-block tw-px-3 tw-py-2 tw-mr-1 md:tw-mr-0 tw-ml-1 md:tw-ml-2 hover:tw-bg-gray-200 hover:tw-text-gray-700 tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
        >
          {page}
        </a>
      </li>
    )
  }
}

export default PageButtonRenderer
