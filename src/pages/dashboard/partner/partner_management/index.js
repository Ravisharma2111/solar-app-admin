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
import axiosInstance from "../../../../utils/axios";

const PartnerManagement = () => {
  const { push } = useRouter();
  const [pageData, setPageData] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const title = "Partner";
  const DASHBOARD_TITLE = "Dashboard";
  const formUrl = `${PATH_DASHBOARD.partner.partner_management}/form`;
  const detailUrl = `${PATH_DASHBOARD.partner.partner_management}/detail`;
  const actionUrl = "partner/getAllPartnerData";
  const searchActionUrl = "partner/searchPartner";
  const deleteActionUrl = "partner/deleteMultipleData";

  const fetchdata = async () => {
    // setLoading(true);
    await axiosInstance
      .get(`${actionUrl}`, {
        params: {
          page: "1",
          limit: "10",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("respnse", response?.data?.data);
          const dataSubset = response?.data?.data.map(
            ({
              _id,
              name,
              dateOfBirth,
              qualification,
              experience,
              qualificationCertificate,
              residentialCertificate,
              address,
              status,
            }) => ({
              id: _id,
              name,
              dateOfBirth,
              qualification,
              experience,
              qualificationCertificate,
              residentialCertificate,
              address,
              status,
            })
          );
          setPageData(dataSubset);
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

    axiosInstance
      .post(searchActionUrl, {
        data: filterSearch,
      })
      .then((response) => {
        if (response.status === 200) {
          const dataSubset = response?.data?.data.map(
            ({
              _id,
              name,
              dateOfBirth,
              qualification,
              experience,
              qualificationCertificate,
              residentialCertificate,
              address,
              status,
            }) => ({
              id: _id,
              name,
              dateOfBirth,
              qualification,
              experience,
              qualificationCertificate,
              residentialCertificate,
              address,
              status,
            })
          );
          setPageData(dataSubset);
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
    if (filterSearch.trim() !== "") {
      getRowData();
    }
  }, [filterSearch]);
  console.log("filterSearch", filterSearch);

  // const rows = [
  //   {
  //     id: 1,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 2,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 3,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 4,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 5,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 6,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 7,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
  //   },
  //   {
  //     id: 8,
  //     name: "Snow Jon",
  //     dob: "9-9-2002",
  //     qualification: "BCA",
  //     experience: "1 year",
  //     qualification_certificate: "XYZ Certificate",
  //     redential_certificate: "XYZ Certificate",
  //     address: "XYZ",
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
          onClick={() => push(`${formUrl}/${params.id}`)}
        />,
      ],
    },
    // {
    //   field: "name",
    //   headerName: "Name",
    //   width: "200",
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography
    //         component="p"
    //         variant="body2"
    //         onClick={() => push(`${detailUrl}/${row.id}`)}
    //         sx={{ cursor: "pointer" }}
    //       >
    //         {row.name}
    //       </Typography>
    //     );
    //   },
    // }

    {
      field: "name",
      headerName: "Name",
      width: "200",
    },
    ,
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: "200",
    },
    {
      field: "qualification",
      headerName: "Qualification",
      width: "200",
    },
    {
      field: "experience",
      headerName: "Experience",
      width: "200",
    },
    {
      field: "qualificationCertificate",
      headerName: "Qualification Certificate",
      width: "200",
    },
    {
      field: "residentialCertificate",
      headerName: "Redential Certificate",
      width: "200",
    },

    {
      field: "address",
      headerName: "Address",
      width: "200",
    },
  ];

  console.log("pageData", pageData);

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
        />
      </ContainerComponent>
    </>
  );
};
PartnerManagement.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default PartnerManagement;
