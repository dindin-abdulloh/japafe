import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    MdArrowDropDown,
    MdOutlineChevronLeft,
    MdChevronRight
} from 'react-icons/md'

const Header = ({ isOpenNav, showNavHandler, logOut }) => {
    const navigate = useNavigate()
    const location = useLocation()
    // const headerTitle = location.pathname.split('/')
    const [headerBar, setHeaderBar] = useState({
        title:
            location.state.title !== ''
                ? location.state.title
                : 'Dashboard',
        subtitle:
            location.state.subtitle !== ''
                ? location.state.subtitle
                : ''
    })

    useEffect(() => {
        setHeaderBar(headerBar => ({
            ...headerBar,
            title:
                location.state.title !== ''
                    ? location.state.title
                    : 'Dashboard',
            subtitle:
                location.state.subtitle !== undefined
                    ? location.state.subtitle
                    : ''
        }))
    }, [location])


    return (
        <>
            <nav className='tw-bg-white tw-border-b tw-z-20 tw-fixed tw-left-0 tw-right-0 tw-flex tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out'>
                <div className='tw-w-full md:tw-w-64 tw-flex md:tw-flex-none'>
                    <button
                        onClick={showNavHandler}
                        type='button'
                        className='md:tw-hidden tw-absolute tw-ml-3 tw-left-0 tw-top-3 tw-text-gray-700 tw-flex tw-items-center tw-p-1 tw-hover:text-gray-500 tw-transition tw-duration-300 tw-ease-in-out'
                    >
                        <MdOutlineChevronLeft
                            size={25}
                            className={`${!isOpenNav ? 'tw--scale-x-100' : 'tw-scale-x-100'
                                } tw-transition tw-duration-300 tw-ease-in-out`}
                        />
                    </button>
                    <div className='tw-ml-12 md:tw-ml-0 md:tw-w-full tw-flex tw-justify-center'>
                        <div className='tw-bg-white tw-p-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlSpace='preserve'
                                width={120}
                                height={30}
                                style={{
                                    shapeRendering: 'geometricPrecision',
                                    textRendering: 'geometricPrecision',
                                    imageRendering: 'optimizeQuality',
                                    fillRule: 'evenodd',
                                    clipRule: 'evenodd'
                                }}
                            >
                                <path
                                    style={{
                                        fill: 'none'
                                    }}
                                    d='M0 5.26h119.99v19.46H0z'
                                />
                                <path
                                    d='M4.03 23.43c2.27.77 5.92 1.27 10.01 1.27 1.11 0 2.19-.04 3.22-.1 3.91-.26 7.05-.99 8.44-1.94V6.55h3V5.24H14.27v1.31h2.99v16.92c-.96.23-2.05.36-3.22.36-1.23 0-2.4-.15-3.4-.4h.14v-3.67h3.64v-1.3H0v1.3h2.34v2.88c.4.3.98.56 1.69.79zm102.45-5.84h-7.39l3.85-9.89 3.54 9.89zm-6.61 5.84h-3.09l1.79-4.53h8.39l1.62 4.53h-2.99v1.33H120v-1.33h-2.86l-6.05-16.88-.47-1.31h-8.92l-.52 1.31-6.61 16.88h-3.13v1.33h8.43v-1.33zm-39.29 0v1.33h14.4v-1.33h-2.94V16.5h7.24c.23-.02.48-.02.71-.04 2.27-.13 4.36-.52 6.09-1.09.89-.29 1.67-.64 2.34-1V7.39c-.67-.36-1.44-.69-2.3-.97-1.73-.58-3.84-.99-6.13-1.12-.59-.04-1.21-.06-1.84-.06H60.62v1.31h2.99v16.88h-3.03zM79.99 6.62v8.49c-1.21.29-2.38.45-3.63.45-1.18 0-2.32-.14-3.36-.39a6.2 6.2 0 0 1-.96-.27V6.82c.31-.1.64-.17.96-.27 1.04-.23 2.18-.37 3.36-.37 1.25 0 2.42.16 3.63.44zm-34.7 10.97h-7.42l3.87-9.89 3.55 9.89zm-6.61 5.84h-3.09l1.76-4.53h8.4l1.63 4.53h-3v1.33h14.41v-1.33h-2.86L49.9 6.55l-.48-1.31H40.49l-.5 1.31-6.61 16.88h-3.13v1.33h8.43v-1.33z'
                                    style={{
                                        fill: 'rgb(239 68 68)'
                                    }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='tw-hidden md:tw-flex tw-w-full tw-py-3 tw-px-6'>
                    <div className='tw-flex tw-item-center'>
                        <button
                            onClick={showNavHandler}
                            type='button'
                            className=' tw-text-gray-700 tw-flex tw-items-center tw-p-1 hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-rounded-full tw-transition tw-duration-300 tw-ease-in-out'
                        >
                            <MdOutlineChevronLeft
                                size={25}
                                className={`${isOpenNav ? 'tw--scale-x-100' : 'tw-scale-x-100'
                                    } tw-transition tw-duration-300 tw-ease-in-out`}
                            />
                        </button>
                        <ol className='tw-list-reset tw-flex tw-font-semibold tw-items-center tw-mx-2'>
                            <li>
                                <a className='tw-text-gray-700'>{headerBar.title.replace(/-/g, ' ')}</a>
                            </li>
                            {headerBar.subtitle !== '' && (
                                <li>
                                    <MdChevronRight className='tw-text-gray-300' />
                                </li>
                            )}
                            <li>
                                <a className='tw-text-gray-300'>{headerBar.subtitle.replace(/-/g, ' ')}</a>
                            </li>
                        </ol>
                    </div>
                    <div className='tw-flex tw-items-center tw-ml-auto'>
                        {/* <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              class="rounded-full w-12"
              alt="Avatar"
            /> */}
                        <div
                            id='dropdownMenuAcount'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                            className='tw-bg-red-500 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-8 tw-h-8 tw-cursor-pointer tw-outline tw-outline-2 tw-outline-white hover:tw-outline-red-300 tw-transition-all tw-duration-300'
                        >
                            <p className='tw-text-white'>J</p>
                        </div>
                        <p className='tw-hidden md:tw-flex tw-items-center tw-ml-2 tw-font-semibold tw-text-gray-700'>
                            Nama Pengguna
                        </p>

                        <ul
                            className='dropdown-menu tw-min-w-max tw-w-32 tw-absolute tw-bg-white tw-text-base tw-right-0 tw-py-2 tw-list-none tw-text-left tw-rounded tw-shadow-lg tw-mt-1 tw-hidden tw-m-0 tw-bg-clip-padding tw-border tw-border-solid'
                            aria-labelledby='dropdownMenuAcount'
                        >
                            <li className="hover:tw-bg-gray-200">
                                <span className='dropdown-item tw-cursor-pointer active:tw-bg-gray-200 active:tw-text-gray-700 tw-text-sm tw-py-2 tw-px-4 tw-font-normal tw-block tw-w-full tw-whitespace-nowrap tw-bg-transparent tw-text-gray-700'>
                                    Kelola akun
                                </span>
                            </li>
                            <li className="hover:tw-bg-gray-200">
                                <span onClick={logOut} className='dropdown-item tw-cursor-pointer active:tw-bg-gray-200 active:tw-text-gray-700 tw-text-sm tw-py-2 tw-px-4 tw-font-normal tw-block tw-w-full tw-whitespace-nowrap tw-bg-transparent tw-text-gray-700'>
                                    Log out
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='tw-absolute tw-flex md:tw-hidden tw-mt-[60px] tw-px-6 tw-py-2 tw-w-full'>
                <div className='tw-flex tw-item-center'>
                    <ol className='tw-list-reset tw-flex tw-font-semibold tw-items-center tw-mx-2'>
                        <li>
                            <a className='tw-text-gray-700'>{headerBar.title}</a>
                        </li>
                        {headerBar.subtitle !== '' && (
                            <li>
                                <MdChevronRight className='tw-text-gray-300' />
                            </li>
                        )}
                        <li>
                            <a className='tw-text-gray-300'>{headerBar.subtitle}</a>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    )
}

export default Header
