import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

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
        <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none tw-overflow-auto'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-[866px] tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current '>
          <div className='tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-pt-[40px] tw-px-6 tw-rounded-t'>
              <div>
                <h5
                  className='tw-text-[24px] tw-leading-normal tw-font-[700] tw-text-[#202020] truncate '
                  id='exampleModalLabel'
                >
                  {valAksi.nama} 
                </h5>
                <p className='tw-text-[#9A9A9A] tw-text-[18px] tw-font-[400]'>ID Customer #{valAksi.id_customer}</p>
              </div>
              
              <div>
                <button className='tw-text-[#9A9A9A] tw-flex' type='button' aria-label='Close' data-bs-dismiss='modal'>
                    <span className='tw-text-[#9A9A9A] tw-text-[14px] tw-font-[600]'>Close</span>
                    <MdOutlineClose className='tw-translate-y-[1px]' size={18} />
                </button>
              </div>
          </div>

          <div className='tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-pt-[40px] tw-px-6 tw-rounded-t '>
          <div className='tw-mt-[24px] tw-container'>
            <h3 className='tw-text-[#000000] tw-text-[20px] tw-font-[600]'>Company</h3>
            <div className='tw-flex sm:tw-flex-col lg:tw-flex-row tw-mt-[14px] tw-gap-[34px]'>
              <div className=''>
                  <div className=''>
                    <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">Company Name</label>
                    <input value={valAksi.nama} className='px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000] tw-block' disabled type="text" />
                  </div>

                  <div className='tw-pt-[14px]'>
                    <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">City</label>
                    <input value={valAksi.kota} className='tw-px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000] tw-block' disabled type="text" />
                  </div>
              </div>

              <div className=''>
                  <div className='tw-flex lg:tw-flex-row tw-flex-col tw-justify-between tw-gap-[34px]'>
                    <div>
                      <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">City</label>
                      <input value={valAksi.kota} className='tw-px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000]' disabled type="text" />
                    </div>

                    <div>
                      <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">Office Email</label>
                      <input value={valAksi.email} className='tw-px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000]' disabled type="text" />
                    </div>
                  </div>

                  <div className='tw-pt-[14px]'>
                      <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">Address</label>
                      <textarea value={valAksi.alamat} disabled className='tw-py-2 tw-block tw-bg-[#F0F2F4] tw-rounded-md lg:tw-w-[500px] lg:tw-h-[114px] tw-px-4' cols="30" rows="10"></textarea>
                    </div>
              </div>
            </div>

            <h3 className='tw-text-[#000000] tw-text-[20px] tw-font-[600] tw-mt-[14px]'>Contact Person</h3>
            {valAksi.cuskontak.map((val) => {
                return (
                  <div key={val.id} className='tw-flex sm:tw-flex-col lg:tw-flex-row tw-mt-[14px] tw-gap-[34px] tw-pb-4'>
                          <div>
                            <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">Contact Person</label>
                            <input value={val.contact_person} className='tw-px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000]' disabled type="text" />
                          </div>

                          <div>
                            <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">Phone</label>
                            <input value={val.contact_person_telp} className='tw-px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000]' disabled type="text" />
                          </div>

                          <div>
                            <label className='tw-text-[16px] tw-text-[#000000] tw-font-semibold tw-block' htmlFor="">Email</label>
                            <input value={val.email_person} className='tw-px-2 tw-w-[210px] tw-h-[40px] tw-rounded-md tw-bg-[#F0F2F4] tw-text-[#000000]' disabled type="text" />
                          </div>
                  </div>
                )
            })}
          </div>
        </div>

            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <button
                type='button'
                className='hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded-full tw-duration-150 tw-ease-in-out'
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
