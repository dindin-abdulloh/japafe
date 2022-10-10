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
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable tw-relative tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                ADD ACCOUNTABILITY OF CASH ADVANCE{" "}
              </h5>
              <button
                type="button"
                className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              {/* //content */}
              <form>
                <div className="flex tw-gap-6">
                  <div className="tw-form-group tw-mb-2 tw-w-1/2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Id SPJ
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
                      Date Prepare
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
                      Id REF
                    </label>
                    <select
                      defaultValue="default"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      aria-label="Default select example"
                    >
                      <option value="default" disabled>
                        -choose-
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
                      Ref Prepared
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="jenis"
                      placeholder="Ref Prepared"
                    />
                  </div>
                </div>
                <div className="tw-flex tw-gap-6">
                  <div className="tw-form-group tw-mb-2 tw-w-1/2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      PIC
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="jenis"
                      placeholder="pic"
                    />
                  </div>
                  <div className="tw-form-group tw-mb-2 tw-w-1/2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      No Job
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="jenis"
                      placeholder="No Job"
                    />
                  </div>
                </div>
                <div className="tw-flex tw-gap-6">
                  <div className="tw-form-group tw-mb-2 tw-w-1/2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Value
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="jenis"
                      placeholder="Value"
                    />
                  </div>
                  <div className="tw-form-group tw-mb-2 tw-w-1/2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Dep
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="jenis"
                      placeholder="IT"
                    />
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                  >
                    Saldo
                  </label>
                  <input
                    type="text"
                    className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                    id="npwp"
                    rows="3"
                    placeholder="0"
                  />
                </div>
                <div className="form-group mb-2">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    type="textarea"
                    className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                    id="npwp"
                    rows="3"
                    placeholder="Description"
                  />
                </div>
                <div className="form-group mb-2">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                  >
                    Note
                  </label>
                  <textarea
                    type="textarea"
                    className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                    id="npwp"
                    rows="3"
                    placeholder="Note"
                  />
                </div>
                <div className="tw-flex tw-gap-6">
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      ExpenseType
                    </label>
                    <select
                      defaultValue="default"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      aria-label="Default select example"
                    >
                      <option value="default" disabled>
                        -choose-
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Date
                    </label>
                    <MyDatePicker
                      formClassName={`tw-text-left tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                      handleOnChange={(date) => {}}
                      format={`M/DD/YYYY`}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      type="textarea"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="npwp"
                      rows="3"
                      placeholder="Description"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id=""
                      placeholder="Quantity"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Unit
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id=""
                      placeholder="Unit"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id=""
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Discount
                    </label>
                    <input
                      type="number"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id=""
                      placeholder="0.0"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Total
                    </label>
                    <input
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id=""
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                    >
                      Remark
                    </label>
                    <input
                      type="number"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id=""
                      placeholder=""
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label
                      htmlFor="exampleInputEmail2"
                      className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-14 tw-text-gray-700"
                    ></label>
                    <button
                      type="button"
                      className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
                    >
                      Add
                    </button>
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
