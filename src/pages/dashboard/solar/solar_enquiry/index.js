"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { Button, Chip, Tooltip, Typography } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { PATH_DASHBOARD } from "@/routes/paths";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import Label from "@/components/label";
import { Router } from "next/router";
import  axiosInstance  from "../../../../utils/axios";


const SolarEnquiry = () => {
  const { push } = useRouter();
  const [pageData, setPageData] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [totalData, setTotalData] = React.useState();
  const [page, setPage] = React.useState(0);
const [pageSize, setPageSize] = React.useState(10);


  const title = "Solar Enquiries";
  const DASHBOARD_TITLE = "Dashboard";
  const formUrl = `${PATH_DASHBOARD.solar.solar_enquiry}/form`;
  const detailUrl = `${PATH_DASHBOARD.solar.solar_enquiry}/detail`;
  const actionUrl = "solarEnquiry/getAllSolarEnquiryData";

  const searchActionUrl = "solarEnquiry/searchSolarEnquiry";
  
  const deleteActionUrl = "solarEnquiry/deleteMultipleData";

  
  const handlePaginationChange = (newPage) => {
    setPage(newPage);
    fetchdata();
  };

  const fetchdata = async () => {

    // setLoading(true);
    await axiosInstance.get(`${actionUrl}`, {
        params: {
          page:  page + 1,
          limit:pageSize,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const dataSubset = response?.data?.data.map(({ _id,name,  email, mobile, state, city,address, status }) => ({
            id: _id,
            name,
            mobile,
            email,
            state,
            city,
            address,
            status,
          }));
          setPageData(dataSubset);
          setTotalData( response?.data?.totalData);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onFilterSearch = (e) => {
    setFilterSearch(e.target.value);
  };

  const getRowData = () => {
    setLoading(true);

    axiosInstance.post(searchActionUrl, {
      data: filterSearch,
    })
      .then((response) => {
        if (response.status === 200) {
          const dataSubset = response?.data?.data.map(({ _id,name,  email, mobile, state, city,address, status }) => ({
            id: _id,
            name,
            mobile,
            email,
            state,
            city,
            address,
            status,
          }));
          setPageData(dataSubset);
          console.log("pageData 3", pageData);

          setTotalData( response?.data?.totalData);
        }
      })
      .catch((error) => {
        const { response } = error;
        if (response && response.data && response.data.message) {
          enqueueSnackbar(response.data.message, {
            variant: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  React.useEffect(() => {
    if (filterSearch.trim() !== '') {
      getRowData();
    }
  }, [filterSearch]);
  console.log("filterSearch", filterSearch);


  // const handleEditData = (params) => {
  //   push(`${formUrl}/${params.id}`)
  
  // }

  // const rows = [
  //   {
  //     id: 1,
  //     name: "Snow Jon",
  //     email: "snowjon@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 2,
  //     name: "Lannister Cersei",
  //     email: "lannistercersei@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 3,
  //     name: "Lannister Jaime",
  //     email: "lannisterjaime@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 4,
  //     name: "Stark Arya",
  //     email: "starkarya@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 5,
  //     name: "Targaryen Daenerys",
  //     email: "targaryendaenerys@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 6,
  //     name: "Clifford Ferrara",
  //     email: "cliffordferrara@gmail.com",
  //     mobile: "1234567890",
  //     status: false,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 7,
  //     name: "Frances Rossini",
  //     email: "francesrossini@gmail.com",
  //     mobile: "1234567890",
  //     status: false,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  //   {
  //     id: 8,
  //     name: "Roxie Harvey",
  //     email: "roxieharvey@gmail.com",
  //     mobile: "1234567890",
  //     status: false,
  //     city: "XYZ City",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //     latest_electricity_bill: "5646",
  //     state: "udaipur",
  //   },
  // ];

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "100",
      getActions: (params) => [
        <GridActionsCellItem
          key="viewAction"
          icon={
            <Tooltip title="Edit">
              <Iconify icon="circum:edit" width={25} />
            </Tooltip>
          }
          label="Edit"
          // onClick={() => handleEditData(params)}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Name",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <Typography
            component="p"
            variant="body2"
            // onClick={() => push(`${detailUrl}/${row.id}`)}
            sx={{ cursor: "pointer" }}
          >
            {row.name}
          </Typography>
        );
      },
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: "200",
    },
    {
      field: "email",
      headerName: "Email",
      width: "300",
    },
    // {
    //   field: "latest_electricity_bill",
    //   headerName: "Latest Electricity Bill",
    //   width: "300",
    // },
    {
      field: "state",
      headerName: "State",
      width: "300",
    },
    {
      field: "city",
      headerName: "City",
      width: "300",
    },
    {
      field: "address",
      headerName: "Address",
      width: "300",
    },
    {
      field: "status",
      type: "boolean",
      headerName: "Status",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <Label
            variant="soft"
            color={(row.status && "success") || (!row.status && "error")}
          >
            {row.status ? "Active" : "InActive"}
          </Label>
        );
      },
    },
  ];

  console.log("pageData 4",pageData);

  return (
    <>
      <Head>
        <title>{title} List</title>
      </Head>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading={title}
          links={[
            {
              name: DASHBOARD_TITLE,
              href: PATH_DASHBOARD.general.app,
            },
            {
              name: title,
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
          action={
            <Button
              component={NextLink}
              href={`${formUrl}/new`}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add
            </Button>
          }
        />

        <DataTable
         deleteActionUrl={deleteActionUrl}
        onFilterSearch={onFilterSearch}
          rowsData={pageData}
          title={title}
          actionUrl={actionUrl}
          defaultSortModel={[{ field: "updated_at", sort: "desc" }]}
          defaultFilterModel={{
            items: [],
          }}
          columns={columns}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
          setFilterSearch={setFilterSearch}
          filterSearch={filterSearch}
          fetchdata={fetchdata}
          totalData={totalData}
          pageSize={pageSize}
          page={page}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </ContainerComponent>
    </>
  );
};
SolarEnquiry.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default SolarEnquiry;
