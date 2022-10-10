import React, { useRef, useState, useEffect } from "react";
import MyDatePicker from "../data_picker/MyDatePicker";

const ModalTambah = () => {
  const equRef = useRef(null);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="tambah"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                ADD MATERIAL REQUEST
              </h5>
              <ul
                class="nav nav-tabs tw-flex tw-flex-row tw-flex-wrap tw-list-none tw-border-b-0 tw-pl-0"
                id="tabs-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    href="#tabs-mr"
                    class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent active"
                    id="tabs-mr-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-mr"
                    role="tab"
                    aria-controls="tabs-mr"
                    aria-selected="true"
                  >
                    Material Request
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    href="#tabs-detail"
                    class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent"
                    id="tabs-detail-mr"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-detail"
                    role="tab"
                    aria-controls="tabs-detail"
                    aria-selected="false"
                  >
                    Material Detail
                  </a>
                </li>
              </ul>
              {/* <button
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button> */}
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              {/* //content */}
              <form>
                <div class="tab-content" id="tabs-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="tabs-mr"
                    role="tabpanel"
                    aria-labelledby="tabs-mr-tab"
                  >
                    <div className="flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Id Material Request
                        </label>
                        <input
                          disabled
                          value="2022/08/CO-JAPA/032"
                          type="text"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="jenis"
                          placeholder="ID"
                        />
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Date Of Mr
                        </label>
                        <MyDatePicker
                          formClassName={`tw-text-left tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          handleOnChange={(date) => {}}
                          format={`M/DD/YYYY`}
                        />
                      </div>
                    </div>
                    <div className="tw-flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Unit Of Department
                        </label>
                        <input
                          type="text"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="pph"
                          placeholder="Unit Of Department"
                        />
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          User
                        </label>
                        <input
                          type="text"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="pph"
                          placeholder="User"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="tabs-detail"
                    role="tabpanel"
                    aria-labelledby="tabs-detail-mr"
                  >
                    <div className="tw-flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Mr Type
                        </label>
                        <select
                          defaultValue="default"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          aria-label="Default select example"
                        >
                          <option value="default" disabled>
                            Job
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Reference
                        </label>
                        <select
                          defaultValue="default"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          aria-label="Default select example"
                        >
                          <option value="default" disabled>
                            -choice-
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                    <div className="tw-flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Material Name
                        </label>
                        <select
                          defaultValue="default"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          aria-label="Default select example"
                        >
                          <option value="default" disabled>
                            -choice-
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Material Size/Type
                        </label>
                        <select
                          defaultValue="default"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          aria-label="Default select example"
                        >
                          <option value="default" disabled>
                            -choice-
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                    <div className="tw-flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Qty
                        </label>
                        <input
                          type="number"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="pph"
                          placeholder="User"
                        />
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Unit
                        </label>
                        <input
                          type="text"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="pph"
                          placeholder="Unit"
                        />
                      </div>
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        Remark
                      </label>
                      <input
                        type="text"
                        className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                        id="pph"
                        placeholder="-"
                      />
                    </div>
                    <div className="tw-relative">
                      <button
                        type="button"
                        className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              <button
                type="button"
                className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalTambah;
