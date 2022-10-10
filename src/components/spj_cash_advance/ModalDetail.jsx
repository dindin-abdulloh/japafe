import React from 'react'

const ModalDetail = () => {
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
        <div className='modal-dialog tw-modal-lg tw-modal-dialog-centered tw-modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Form Detail
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
              {/* <form>
                                <div className='form-group mb-2'>
                                    <label
                                        htmlFor='exampleInputEmail2'
                                        className='form-label text-sm font-bold inline-block mb-2 text-gray-700'
                                    >
                                        Nama
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control block w-full px-3 py-2 text-sm font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        id='nama'
                                        defaultValue={valAksi.nama}
                                        placeholder='Nama'
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label
                                        htmlFor='exampleInputEmail2'
                                        className='form-label text-sm font-bold inline-block mb-2 text-gray-700'
                                    >
                                        Alamat
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control block w-full px-3 py-2 text-sm font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        id='alamat'
                                        defaultValue={valAksi.alamat}
                                        placeholder='Alamat'
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label
                                        htmlFor='exampleInputEmail2'
                                        className='form-label text-sm font-bold inline-block mb-2 text-gray-700'
                                    >
                                        Jenis
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control block w-full px-3 py-2 text-sm font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        id='jenis'
                                        defaultValue={valAksi.jenis}
                                        placeholder='Jenis'
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label
                                        htmlFor='exampleInputEmail2'
                                        className='form-label text-sm font-bold inline-block mb-2 text-gray-700'
                                    >
                                        PPh
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control block w-full px-3 py-2 text-sm font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        id='pph'
                                        defaultValue={valAksi.pph}
                                        placeholder='PPh'
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label
                                        htmlFor='exampleInputEmail2'
                                        className='form-label text-sm font-bold inline-block mb-2 text-gray-700'
                                    >
                                        PPN
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control block w-full px-3 py-2 text-sm font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        id='ppn'
                                        defaultValue={valAksi.ppn}
                                        placeholder='PPN'
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label
                                        htmlFor='exampleInputEmail2'
                                        className='form-label text-sm font-bold inline-block mb-2 text-gray-700'
                                    >
                                        NPWP
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control block w-full px-3 py-2 text-sm font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        id='npwp'
                                        defaultValue={valAksi.npwp}
                                        placeholder='NPWP'
                                    />
                                </div>
                            </form> */}
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <button
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalDetail
