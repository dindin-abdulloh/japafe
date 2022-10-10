import React, { useState, memo } from "react";
import {
  textFilter,
  selectFilter,
  customFilter,
  FILTER_TYPES,
} from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import AksiFormatter from "../components/service_request/AksiFormatter";
import PageButtonRenderer from "../components/tabel/PageButtonRenderer";
import SizePerPageRenderer from "../components/tabel/SizePerPageRenderer";
import MyDatePicker from "../components/data_picker/MyDatePicker";
import ModalTambah from "../components/service_request/ModalTambah";
import ModalEdit from "../components/service_request/ModalEdit";
import ModalDetail from "../components/service_request/ModalDetail";
import ModalRemove from "../components/service_request/ModalRemove";
import MyTable from "../components/tabel/MyTable";
const classNameFilterForm =
  "tw-form-control tw-flex tw-py-1 tw-px-2 tw-text-xs tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none";

const ServiceRequest = () => {
  console.log("====================================");
  console.log("page service_request");
  console.log("====================================");

  const data = [];

  const [isHiden, setIsHiden] = useState({
    SRNo: true,
    date_prepare: true,
    jobno: true,
    requestby: true,
    options: true,
  });

  const [valAksi, setValAksi] = useState({
    SRNo: "",
    date_prepare: "",
    jobno: "",
    requestby: "",
    options: "",
  });

  const defaultToggleColumn = (toggleVal, columnField) => {
    setIsHiden((isHiden) => ({
      ...isHiden,
      [columnField]: !toggleVal,
    }));
  };

  const conditionHidden = (column) => {
    return (
      column.text !== "#" && column.text !== "Prepare" && column.text !== "Aksi"
    );
  };

  const showModalHandler = (type, row = null) => {
    console.log("====================================");
    console.log(type);
    console.log("====================================");
    let elModal = null;
    if (row !== null) {
      setValAksi((valAksi) => ({
        ...valAksi,
        id: row.id,
        SRNo: row.SRNo,
        date_prepare: row.date_prepare,
        jobno: row.jobno,
        requestby: row.requestby,
        options: row.options,
      }));
    }

    switch (type) {
      case "tambah":
        elModal = document.querySelector(`#${type}`);
        break;
      case "detail":
        elModal = document.querySelector(`#${type}`);
        break;
      case "edit":
        elModal = document.querySelector(`#${type}`);
        break;
      case "remove":
        elModal = document.querySelector(`#${type}`);
        break;

      default:
        break;
    }
    if (elModal !== null) {
      const modal = window.Modal.getOrCreateInstance(elModal);
      modal.show();
    }
  };

  const selectOptions = [{ value: "Electrical", label: "Electrical" }];

  const columns = [
    {
      dataField: "no",
      text: "#",
      sort: false,
      headerStyle: () => ({ width: "50px" }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const currentPage = 1;
        const rowNumber = (currentPage - 1) * 10 + (rowIndex + 1);
        return rowNumber;
      },
    },
    {
      dataField: "SRNo",
      text: "SR No",
      headerStyle: () => ({ width: "180px" }),
    },
    {
      dataField: "date_prepare",
      text: "Date Prepare",
      headerStyle: () => ({ width: "180px" }),
    },
    {
      dataField: "jobno",
      text: "Job No",
      headerStyle: () => ({ width: "180px" }),
    },

    {
      dataField: "requestby",
      text: "Request By",
      headerStyle: () => ({ width: "180px" }),
    },
    {
      dataField: "options",
      text: "Options",
      headerStyle: () => ({ width: "180px" }),
    },
    {
      dataField: "aksi",
      text: "Aksi",
      headerStyle: () => ({ width: "180px" }),
      formatter: (cell, row) => {
        return <AksiFormatter row={row} showModalHandler={showModalHandler} />;
      },
    },
  ];

  // const expandRow = {
  //     onlyOneExpanding: true,
  //     className: 'tw-bg-gray-200',
  //     renderer: row => {
  //         return (
  //             <BootstrapTable
  //                 keyField='id'
  //                 classes='m-0'
  //                 data={[
  //                     {
  //                         nama: 'andri',
  //                         telp: '080087996'
  //                     }
  //                 ]}
  //                 columns={[
  //                     {
  //                         dataField: 'nama',
  //                         text: 'Nama'
  //                     },
  //                     {
  //                         dataField: 'telp',
  //                         text: 'Telephone'
  //                     }
  //                 ]}
  //             />
  //         )
  //     },
  //     showExpandColumn: false
  // }

  const onPageChange = (page) => {};

  const options = {
    // sizePerPage: 3,
    custom: true,
    totalSize: data.length,
    pageButtonRenderer: (pageProps) => {
      return (
        <PageButtonRenderer
          key={pageProps.page}
          pageProps={pageProps}
          onPageChange={onPageChange}
        />
      );
    },
    sizePerPageRenderer: SizePerPageRenderer,
  };

  return (
    <>
      <div className="tw-bg-white tw-p-3 tw-rounded-lg">
        <MyTable
          data={data}
          columns={columns}
          options={options}
          defaultToggleColumn={defaultToggleColumn}
          showModalHandler={showModalHandler}
          conditionHidden={conditionHidden}
          expandRow={{}}
        />
      </div>
      <ModalTambah />
      <ModalEdit valAksi={valAksi} />
      <ModalDetail />
      <ModalRemove />
    </>
  );
};

export default memo(ServiceRequest);
