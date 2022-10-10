import React from 'react'
import moment from 'moment'

const ModalDetail = ({ valAksi }) => {
  return (
    <React.Fragment>
      <div
        className='modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto'
        id='detail'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='detail'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Detail Employee
              </h5>
              <button
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <table className="tw-min-w-full">
                <tbody>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      NIP
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.nip}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Nickname
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.nickname}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Employee name
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.nama_karyawan}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Department
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.departement}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Email
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.email}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Birth place
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.tmptlahir}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Birth date
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {moment(valAksi.tgllahir).format('M/DD/YYYY')}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      ID Card
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.id_card}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Employee status
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.karyawan_status}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Gender
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.jenis_kelamin}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Maritial Status
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.status}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      City
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {valAksi.kota}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Start Joining
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {moment(valAksi.starjoin).format('M/DD/YYYY')}
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Remaining days off
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      {moment(valAksi.endjoin).format('M/DD/YYYY')}
                    </td>
                  </tr>
                  {/* <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Phone Number
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      QU202208063
                    </td>
                  </tr>
                  <tr className="tw-border-b">
                    <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                      Email
                    </td>
                    <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                      QU202208063
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <button
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalDetail
