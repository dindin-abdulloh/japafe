import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { MdDashboard, MdKeyboardArrowRight, MdContentPaste } from 'react-icons/md'
import listMenu from './listmenu'

const menuNav = listMenu

const Sidenav = ({ innerRef, startLoading }) => {
    const location = useLocation()
    const [subMenuId, setsubMenuId] = useState('')

    const headerTitle = useMemo(() => {
        return location.pathname.split("/")
    }, [location.pathname])
    const [headerBar, setHeaderBar] = useState({
        title: headerTitle[1] !== '' ? headerTitle[1] : 'dashboard',
        subtitle: headerTitle[2] !== undefined ? headerTitle[2] : '',
    })

    const subNavHandler = (e) => {
        if (subMenuId !== e.currentTarget.id) {
            setsubMenuId(e.currentTarget.id)
        } else {
            setsubMenuId('')
        }
    }

    useEffect(() => {
        const expandedMenu = document.querySelectorAll('.expanded')
        let elSub = null
        expandedMenu.forEach((el) => {
            elSub = el.nextElementSibling
            if (el.id === subMenuId) {
                const elSubHeight = (elSub.children[0].offsetHeight)
                const elSubLength = elSub.childElementCount
                const elHeight = ((elSubHeight * elSubLength))
                elSub.style.maxHeight = (elHeight) + 'px'
            } else {
                elSub.style.maxHeight = '0px'
            }
        })
    }, [subMenuId]);

    useEffect(() => {
        setHeaderBar((headerBar) => ({
            ...headerBar,
            title: headerTitle[1] !== '' ? headerTitle[1] : 'dashboard',
            subtitle: headerTitle[2] !== undefined ? headerTitle[2] : ''
        }))
    }, [location, headerTitle])

    return (
        <div ref={innerRef} className="tw--translate-x-64 md:tw-translate-x-0 tw-z-20 tw-bg-[#FAFBFC] tw-overflow-auto tw-w-64 tw-h-full tw-bg-[] tw-fixed tw-transition-all tw-duration-500 tw-ease-in-out">
            <ul className="tw-relative tw-mt-20 tw-mb-6">
                {
                    menuNav.map((m) => {
                        const menuId = m.id
                        return (
                            <li key={m.id} className="tw-relative">
                                {
                                    m.subMenu === null ?

                                        <Link onClick={startLoading} to={m.link} state={{ title: m.title }} className={`${headerBar.title === m.id ? 'tw-text-white hover:tw-text-white' : 'tw-text-gray-700 hover:tw-text-gray-700'} tw-relative tw-flex parent tw-items-center tw-py-2 tw-px-6 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-whitespace-nowrap tw-transition tw-duration-300 tw-ease-in-out`}>
                                            {/* {<m.icon />} */}
                                            <span className="tw-ml-2 tw-font-semibold">{m.title}</span>
                                            <span className={` ${headerBar.title === m.id ? 'tw-bg-red-500' : 'tw-bg-sky-100'} tw--z-10 tw-rounded tw-left-4 tw-right-4 tw-h-8 tw-absolute tw-transition-all tw-duration-300`}></span>
                                        </Link>
                                        :
                                        <button id={m.id} onClick={subNavHandler} className={`${subMenuId === m.id ? 'tw-text-[#E23C40] tw-border-l-4 tw-border-[#E23C40]' : 'tw-text-gray-700'} tw-relative parent expanded tw-flex tw-w-full tw-items-center tw-py-2 tw-px-6 tw-overflow-hidden tw-text-[18px] tw-text-ellipsis tw-whitespace-nowrap tw-transition tw-duration-300 tw-ease-in-out tw-font-[700]`}>
                                            {/* {<m.icon />} */}
                                            <span className="tw-ml-2 tw-font-semibold">{m.title}</span>
                                            {/* <MdKeyboardArrowRight className={`${subMenuId === m.id ? 'tw-rotate-90' : 'tw-rotate-0'} tw-ml-auto tw-transition tw-duration-300`} /> */}
                                            <span className={` tw--z-10 tw-rounded tw-left-4 tw-right-4 tw-h-6 tw-absolute tw-transition-all tw-duration-300`}></span>
                                        </button>

                                }

                                {
                                    m.subMenu !== null &&
                                    <ul className="tw-relative tw-ml-3 tw-overflow-hidden tw-max-h-0 tw-transition-all tw-duration-300" id="collapseOrderNav">
                                        {
                                            m.subMenu.map((sm) => {
                                                return (
                                                    <li key={sm.id} className="tw-relative">

                                                        <Link onClick={startLoading} to={sm.link} state={{ title: m.title, subtitle: sm.title }} className={`${headerBar.subtitle === sm.id ? 'tw-text-[#E23C40]' : 'tw-text-gray-700 hover:tw-text-gray-700'} tw-flex tw-relative parent tw-items-center tw-py-2 tw-px-4 tw-overflow-hidden tw-text-gray-700 tw-text-[16px] tw-font-semibold tw-text-ellipsis tw-whitespace-nowrap tw-transition tw-duration-300 tw-ease-in-out tw-ml-[20px]`}>
                                                            {<sm.icon />}
                                                            <span className="tw-ml-2 tw-font-medium">{sm.title}</span>
                                                            <span className={`${headerBar.subtitle === sm.id ? 'tw-text-[#E23C40]' : 'tw-text-[#45526C]'} tw--z-10  tw-left-4 tw-right-4 tw-rounded tw-h-8 tw-absolute tw-transition-all tw-duration-300`}></span>
                                                            <span className="tw-absolute tw-h-10 tw-w-[2px] tw-left-[7px]"></span>
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Sidenav