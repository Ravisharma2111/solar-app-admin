"use client";
import * as React from "react";
import DataGridTable from "./dataGrid";
import { TabComponent } from "./tab";
import { Card } from "@mui/material";
import axiosInstance from "@/utils/axios";
import { useSnackbar } from "notistack";
import { ConfirmDialogBox } from "./confirmDialog";
import { useRouter } from "next/router";

export const DataTable = (props) => {
  const { query } = useRouter();
  const { id } = query;
  const { enqueueSnackbar } = useSnackbar();
  const {
    onFilterSearch,
    setPageSize,
    pageSize,
    columns,
    totalData,
    deleteActionUrl,
    defaultSortModel,
    autoHeight = true,
    disableSelectionOnClick,
    checkboxSelection,
    defaultFilterModel,
    actionUrl,
    page,
    setPage,
    title = "One Way Taxi",
    Tabs = [
      {
        value: "all",
        label: "All",
      },
    ],
    params,
    isColumnButton,
    isFilterButton,
    isDensitySelector,
    filterSearch,
    setFilterSearch,
    isDate,
    isSearch,
    isClear,
    rowsData,
    fetchdata,
  } = props;

  const [filterStatus, setFilterStatus] = React.useState("all");
  // const [rowspp, setRowsData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [page, setPage] = React.useState(0);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  // const [pageSize, setPageSize] = React.useState(10);
  const [sortModel, setSortModel] = React.useState(defaultSortModel);
  const [filterModel, setFilterModel] = React.useState(defaultFilterModel);
  // const [filterSearch, setFilterSearch] = React.useState("");
  const [filterStartDate, setFilterStartDate] = React.useState(null);
  const [filterEndDate, setFilterEndDate] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const onFilterEndDate = (newValue) => {
    setFilterEndDate(newValue);
  };
  const onFilterStartDate = (newValue) => {
    setFilterStartDate(newValue);
  };

  const onResetFilter = () => {
    fetchdata();
    setFilterSearch("");
    setFilterStartDate(null);
    setFilterEndDate(null);
  };
  const handlePaginationChange = (newPage) => {
    setPage(newPage);
    fetchdata();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  console.log("onFilterSearch", filterSearch);

  // const getRowData = async () => {
  //   setLoading(true);
  //   const filter = {
  //     data: filterSearch,
  //   };
  //   await axiosInstance
  //     .post(searchActionUrl,  filter )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("response",response);

  //         if (response?.data) {
  //           setRowsData(response?.data || []);
  //           if (response?.data?.data) {
  //             setRowsData(response?.data?.data);
  //             console.log("rowsData",rowsData);

  //           }
  //           if (response?.data?.total) {
  //             setRowCount(response?.data?.total);
  //           }
  //           setLoading(false);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       // setRowsData([]);
  //       const { response } = error;
  //       if (response && response?.data && response?.data?.message) {
  //         enqueueSnackbar(response?.data?.message, {
  //           variant: "error",
  //         });
  //       }
  //     });
  // };
  // React.useEffect(() => {
  //   getRowData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filterSearch]);

  const handleDeleteRows = async () => {
    await axiosInstance
      .delete(deleteActionUrl, {
        data: {
          ids: selectionModel, // Assuming selectionModel contains the array of ids
        },
      })
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar(response?.data?.message, {
            variant: "success",
          });
          handleCloseConfirm();
          fetchdata();
        }
      })
      .catch((error) => {
        handleCloseConfirm();
        const { response } = error;
        if (response && response?.data)
          enqueueSnackbar(response?.data?.message || "Something went wrong", {
            variant: "error",
          });
      });
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };
  // console.log("rowsData", rowsData);

  return (
    <React.Fragment>
      <Card>
        <TabComponent
          title={title}
          TAB_OPTIONS={Tabs}
          filterStatus={filterStatus}
          handleFilterStatus={handleFilterStatus}
        />
        <DataGridTable
          totalData={totalData}
          columns={columns}
          rows={rowsData}
          loading={loading}
          setSelectionModel={setSelectionModel}
          setSortModel={setSortModel}
          selectionModel={selectionModel}
          rowCount={rowCount}
          sortModel={sortModel}
          pageSize={pageSize}
          page={page}
          setPage={setPage}
          setFilterModel={setFilterModel}
          setPageSize={setPageSize}
          filterModel={filterModel}
          checkboxSelection={checkboxSelection}
          disableSelectionOnClick={disableSelectionOnClick}
          autoHeight={autoHeight}
          isColumnButton={isColumnButton}
          isFilterButton={isFilterButton}
          isDensitySelector={isDensitySelector}
          isDate={isDate}
          isSearch={isSearch}
          isClear={isClear}
          filterEndDate={filterEndDate}
          filterStartDate={filterStartDate}
          onFilterEndDate={onFilterEndDate}
          onFilterStartDate={onFilterStartDate}
          filterSearch={filterSearch}
          onFilterSearch={onFilterSearch}
          onResetFilter={onResetFilter}
          handleOpenConfirm={handleOpenConfirm}
        />
      </Card>

      <ConfirmDialogBox
        selected={selectionModel}
        handleCloseConfirm={handleCloseConfirm}
        handleDeleteRows={handleDeleteRows}
        openConfirm={openConfirm}
      />
    </React.Fragment>
  );
};
