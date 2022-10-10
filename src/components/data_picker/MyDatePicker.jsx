import React, { useState, useCallback, useEffect, forwardRef, useMemo, memo } from 'react'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdClose
} from 'react-icons/md'
import { getMonth, getYear, isMatch } from 'date-fns'
import range from 'lodash.range'
import moment from 'moment'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import id from 'date-fns/locale/id'
registerLocale('id', id)

const MyDatePicker = ({ myClassName, formClassName, handleOnChange, format, name = '', value = '' }) => {
  console.log("my data picker");
  const [startDate, setStartDate] = useState('mm/dd/yyyy')
  const [selectedValue, setSelectedValue] = useState('')
  const years = range(1960, getYear(new Date()) + 1, 1)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // const valDate = useMemo(() => value, [value])



  const removeHanndler = () => {
    setStartDate('mm/dd/yyyy')
    setSelectedValue('')
  }

  const handleChangeRaw = value => {
    setStartDate(value)
  }
  const handleChange = date => {
    setSelectedValue(date)
  }

  const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  }

  const isValidDate = val => new Date(val).toString() !== 'Invalid Date'
  const focousOut = value => {
    if (!isValidDate(value)) {
      setStartDate('mm/dd/yyyy')
      setSelectedValue('')
    }
  }

  useEffect(() => {
    if (!isValidDate(selectedValue)) {
      handleOnChange(name, '')
    } else {
      handleOnChange(name, moment(selectedValue).format(`${format}`))
    }
  }, [selectedValue])

  useEffect(() => {
    if (value === '') {
      removeHanndler()
    } else {
      setStartDate(value)
    }
  }, [value])

  /* eslint-disable react/display-name */
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <button
        className={formClassName}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          onClick()
        }}
        ref={ref}
      >
        {value}
      </button>
      {selectedValue !== '' && (
        <button
          className='tw-absolute tw-right-1 tw-top-1'
          onClick={e => {
            e.stopPropagation()
            removeHanndler()
          }}
        >
          <MdClose />
        </button>
      )}
    </>
  ))

  const MyContainer = ({ className, children }) => {
    return (
      <div onClick={e => e.stopPropagation()} className="tw-cursor-default">
        <div className={className}>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  const datePockerHeader = ({
    changeYear,
    changeMonth,
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  }) => {
    return (
      <div className=' tw-text-base tw-font-semibold tw-flex tw-items-center tw-justify-evenly tw-px-3'>

        {/* <span>{moment(date).format('MMMM YYYY')}</span> */}
        {/* <select
          className='tw-text-sm tw-text-gray-700 tw-bg-white'
          value={getYear(date)}
          onChange={(e) => {
            changeYear(e.target.value)
          }}
        >
          {years.map(option => (
            <option
              key={option}
              value={option}
              className='tw-text-sm tw-text-gray-700 tw-font-normal'
            >
              {option}
            </option>
          ))}
        </select> */}

        <select
          className='tw-form-control tw-block tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
          value={months[getMonth(date)]}
          onChange={(e) => {
            changeMonth(months.indexOf(e.target.value))
          }}
        >
          {months.map(option => (
            <option
              key={option}
              value={option}
              className='tw-text-sm tw-text-gray-700 tw-font-normal'
            >
              {option}
            </option>
          ))}
        </select>

        
        <input
          type="text"
          className='tw-form-control tw-block tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none tw-w-14'
          value={getYear(date)}
          onChange={(e) => {
            if (isNumeric(e.target.value)) {
              changeYear(e.target.value)
            }else {
              changeYear(0)
            }
          }}
        />
        
      </div>
    )
  }

  return (
    <div className='tw-w-full'>
      { }
      <DatePicker
        // selected={startDate}
        selected={selectedValue}
        value={startDate}
        // value={moment(startDate).format('MMMM YYYY')}
        onChange={handleChange}
        onChangeRaw={e => {
          e.stopPropagation()
          handleChangeRaw(e.target.value)
        }}
        onBlur={e => {
          e.stopPropagation()
          focousOut(e.target.value)
        }}
        className={myClassName}
        locale='id'
        showYearDropdown
        customInput={<CustomInput />}
        // showTimeSelect
        // timeIntervals={5}
        // timeFormat="p"
        // dateFormat="Pp"
        renderCustomHeader={datePockerHeader}
        calendarContainer={MyContainer}
      />
    </div>
  )
}

export default MyDatePicker
