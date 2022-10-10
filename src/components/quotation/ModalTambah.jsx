import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import MyDatePicker from "../data_picker/MyDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../store/slices/customerSlice";
import { addQuotation, getQuotation } from "../../store/slices/quotationSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MdDelete } from "react-icons/md";

const ModalTambah = ({ val, token }) => {
  const [cusKontak, setCusKontak] = useState([]);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const { success, isLoading, type } = useSelector(
    (state) => state.quotationSlice.resQuotation
  );
  const {
    data,
    limit,
    totalData,
    currentPage,
    isLoading: isLoadingCustomer,
  } = useSelector((state) => state.customerSlice.dataCustomer);

  const formik = useFormik({
    initialValues: {
      quo_number: "",
      cus_id: "",
      address: "",
      city: "",
      contact: "",
      description: "",
      tanggal_quo: "",
      quodesk: [],
      upload: "",
    },
    validationSchema: Yup.object({
      cus_id: Yup.string().required("Customer is required"),
      address: Yup.string().required("Adress is required"),
      city: Yup.string().required("City is required"),
      contact: Yup.string().required("Contact is required"),
      tanggal_quo: Yup.string().required("Date is required"),
      quodesk: Yup.array().min(1, "Detail work is required"),
      upload: Yup.mixed().required("File is required"),
    }),
    onSubmit: (values) => {
      dispatch(addQuotation({ data: values, token: token }));
    },
  });

  const formikDesk = useFormik({
    initialValues: {
      item: "",
      vol: "",
      unit: "",
    },
    validationSchema: Yup.object({
      item: Yup.string().required("Item is required"),
      vol: Yup.number().required("Volume is required"),
      unit: Yup.string().required("Unit is required"),
    }),
    onSubmit: (values) => {
      formik.setValues((val) => ({
        ...val,
        quodesk: val.quodesk.concat(values),
      }));
      formikDesk.resetForm();
      setTimeout(() => {
        modalRef.current.scrollTop = modalRef.current.scrollHeight;
      }, 10);
    },
  });

  const removeListQueDesk = (idx) => {
    formik.setValues((val) => ({
      ...val,
      quodesk: [
        ...val.quodesk.slice(0, idx),
        ...val.quodesk.slice(idx + 1, val.quodesk.length),
      ],
    }));
  };

  const selectCusHandler = (e) => {
    data.forEach((item) => {
      if (e.target.value === item.id) {
        setCusKontak(item.cuskontak);
        formik.setValues((values) => ({
          ...values,
          cus_id: item.id,
          address: item.alamat,
          city: item.kota,
          contact: item.cuskontak[0].contact_person,
        }));
      }
    });
  };

  useLayoutEffect(() => {
    dispatch(getCustomer({ token: token }));
  }, []);

  useEffect(() => {
    if (success) {
      if (type === "tambah") {
        const modal = window.Modal.getInstance(
          document.querySelector("#tambah")
        );
        modal.hide();
        formik.resetForm({ values: "" });
        dispatch(getQuotation({ token: token }));
      }
    }
  }, [success]);

  useEffect(() => {
    formik.setValues((values) => ({
      ...values,
      quo_number: val.createID,
    }));
  }, [val]);

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
        <div className="modal-dialog modal-lg modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-xl tw-font-medium tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Add Form
              </h5>
              <ul
                class="nav nav-tabs tw-flex tw-flex-row tw-flex-wrap tw-list-none tw-border-b-0 tw-pl-0"
                id="tabs-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    href="#tabs-quo"
                    class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent active"
                    id="tabs-quo-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-quo"
                    role="tab"
                    aria-controls="tabs-quo"
                    aria-selected="true"
                  >
                    Quotation
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    href="#tabs-detail"
                    class="nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent"
                    id="tabs-detail-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-detail"
                    role="tab"
                    aria-controls="tabs-detail"
                    aria-selected="false"
                  >
                    Detail
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
            <div
              ref={modalRef}
              className="modal-body tw-relative tw-py-2 tw-px-6"
            >
              {/* //content */}
              <form>
                <div class="tab-content" id="tabs-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="tabs-quo"
                    role="tabpanel"
                    aria-labelledby="tabs-quo-tab"
                  >
                    <div className="flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          ID Quotation
                        </label>
                        <input
                          type="text"
                          disabled
                          className="tw-bg-gray-100 tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded-r tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="nama"
                          onChange={formik.handleChange}
                          value={formik.values.quo_number}
                        />
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/2">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Date
                        </label>
                        <div className="tw-relative">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.tanggal_quo}
                            type="date"
                            className={`${
                              formik.touched.tanggal_quo &&
                              formik.errors.tanggal_quo
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id="tanggal_quo"
                            placeholder=""
                          />
                          {formik.touched.tanggal_quo &&
                            formik.errors.tanggal_quo && (
                              <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                                {formik.errors.tanggal_quo}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        Customer
                      </label>
                      <div className="tw-relative">
                        <select
                          onChange={selectCusHandler}
                          value={formik.values.cus_id}
                          id="cus_id"
                          className={`${
                            formik.touched.cus_id && formik.errors.cus_id
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                          } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label="Default select example"
                        >
                          <option value="" disabled>
                            Pilih Customer
                          </option>
                          {data.length > 0 &&
                            data.map((i, idx) => {
                              return (
                                <option key={idx} value={i.id}>
                                  {i.nama}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.cus_id && formik.errors.cus_id && (
                          <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                            {formik.errors.cus_id}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        Adress
                      </label>
                      <div className="tw-relative">
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.address}
                          disabled
                          type="text"
                          className={`${
                            formik.touched.address && formik.errors.address
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                          } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id="address"
                          placeholder="Adress"
                        />
                        {formik.touched.address && formik.errors.address && (
                          <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                            {formik.errors.address}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        City
                      </label>
                      <div className="tw-relative">
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.city}
                          disabled
                          type="text"
                          className={`${
                            formik.touched.city && formik.errors.city
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                          } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-gray-100 tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id="city"
                          placeholder="City"
                        />
                        {formik.touched.city && formik.errors.city && (
                          <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                            {formik.errors.city}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        Contact
                      </label>
                      <div className="tw-relative">
                        {/* <input
                          onChange={formik.handleChange}
                          value={formik.values.contact}
                          type='text'
                          className={`${formik.touched.contact && formik.errors.contact ? `tw-border-red-500` : `tw-border-gray-300`} tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id='contact'
                          placeholder='Contact'
                        /> */}
                        <select
                          onChange={formik.handleChange}
                          value={formik.values.contact}
                          id="contact"
                          className={`${
                            formik.touched.contact && formik.errors.contact
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                          } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          aria-label="Default select example"
                        >
                          <option value="" disabled>
                            Pilih Customer
                          </option>
                          {cusKontak.length > 0 &&
                            cusKontak.map((i, idx) => {
                              return (
                                <option key={idx} value={i.contact_person}>
                                  {i.contact_person}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.contact && formik.errors.contact && (
                          <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                            {formik.errors.contact}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        type="textarea"
                        className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                        id="description"
                        rows="3"
                        placeholder="Description"
                      />
                    </div>
                    <div className="tw-form-group tw-mb-2">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                      >
                        Upload File
                      </label>
                      <div className="tw-relative">
                        <input
                          onChange={(e) => {
                            formik.setValues((val) => ({
                              ...val,
                              upload: e.currentTarget.files[0],
                            }));
                          }}
                          type="file"
                          accept="upload/*"
                          className={`${
                            formik.touched.upload && formik.errors.upload
                              ? `tw-border-red-500`
                              : `tw-border-gray-300`
                          } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                          id="upload"
                          name="upload"
                          placeholder="Upload file"
                        />
                        {formik.touched.upload && formik.errors.upload && (
                          <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                            {formik.errors.upload}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="tabs-detail"
                    role="tabpanel"
                    aria-labelledby="tabs-detail-tab"
                  >
                    <div className="tw-flex tw-gap-6">
                      <div className="tw-form-group tw-mb-2 tw-w-1/3">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Item
                        </label>
                        <div className="tw-relative">
                          <input
                            onChange={formikDesk.handleChange}
                            value={formikDesk.values.item}
                            type="text"
                            className={`${
                              formikDesk.touched.item && formikDesk.errors.item
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id="item"
                            name="item"
                            placeholder="Item"
                          />
                          {formikDesk.touched.item &&
                            formikDesk.errors.item && (
                              <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                                {formikDesk.errors.item}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/3">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Volume
                        </label>
                        <div className="tw-relative">
                          <input
                            onChange={formikDesk.handleChange}
                            value={formikDesk.values.vol}
                            type="number"
                            className={`${
                              formikDesk.touched.vol && formikDesk.errors.vol
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id="vol"
                            name="vol"
                            placeholder="Volume"
                          />
                          {formikDesk.touched.vol && formikDesk.errors.vol && (
                            <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                              {formikDesk.errors.vol}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="tw-form-group tw-mb-2 tw-w-1/3">
                        <label
                          htmlFor="exampleInputEmail2"
                          className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                        >
                          Unit
                        </label>
                        <div className="tw-relative">
                          <input
                            onChange={formikDesk.handleChange}
                            value={formikDesk.values.unit}
                            type="text"
                            className={`${
                              formikDesk.touched.unit && formikDesk.errors.unit
                                ? `tw-border-red-500`
                                : `tw-border-gray-300`
                            } tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                            id="unit"
                            name="unit"
                            placeholder="Unit"
                          />
                          {formikDesk.touched.unit &&
                            formikDesk.errors.unit && (
                              <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                                {formikDesk.errors.unit}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="tw-relative">
                      <button
                        onClick={formikDesk.handleSubmit}
                        type="button"
                        className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
                      >
                        Add
                      </button>
                    </div>
                    {formik.values.quodesk.length > 0 && (
                      <div className=" tw-mt-2 tw-px-6 tw-overflow-x-auto">
                        <table className="tw-w-full">
                          <thead className="tw-bg-white tw-border-b-2 tw-border-t">
                            <tr>
                              <th
                                scope="tw-col"
                                className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left"
                              >
                                #
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left"
                              >
                                Item
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left"
                              >
                                Volume
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left"
                              >
                                Unit
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-2 tw-text-left"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formik.values.quodesk.map((i, idx) => {
                              return (
                                <tr
                                  key={idx}
                                  className="tw-border-b hover:tw-bg-sky-100"
                                >
                                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                                    {idx + 1}
                                  </td>
                                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3">
                                    {i.item}
                                  </td>
                                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3">
                                    {i.vol}
                                  </td>
                                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-1/3">
                                    {i.unit}
                                  </td>
                                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-2 tw-whitespace-wrap">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        removeListQueDesk(idx);
                                      }}
                                      className="hover:tw-text-gray-700 tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                                    >
                                      <MdDelete size={18} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer tw-relative tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              {formik.touched.quodesk && formik.errors.quodesk && (
                <p className="tw-absolute tw-text-red-500 tw-left-6 tw-top-4 tw-m-0 tw-text-xs">
                  {formik.errors.quodesk}
                </p>
              )}
              <button
                onClick={() => {
                  formik.resetForm({ values: "" });
                  formikDesk.resetForm({ values: "" });
                }}
                type="button"
                className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={formik.handleSubmit}
                type="button"
                className="hover:tw-bg-red-600 tw-inline-block tw-px-6 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
              >
                {isLoading && (
                  <div
                    className="spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2"
                    role="status"
                  >
                    <span className="tw-visually-hidden">Loading...</span>
                  </div>
                )}
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
