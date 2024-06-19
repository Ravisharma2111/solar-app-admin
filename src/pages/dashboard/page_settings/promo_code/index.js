"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { Avatar, Button, Chip, Tooltip, Typography } from "@mui/material";
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


const PromoCode = () => {
  const { push } = useRouter();
  const [pageData, setPageData] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  const title = "Promo Code";
  const DASHBOARD_TITLE = "Dashboard";
  const formUrl = `${PATH_DASHBOARD.page_settings.promo_code}/form`;
  const detailUrl = `${PATH_DASHBOARD.page_settings.promo_code}/detail`;
  const actionUrl = "promoCode/getAllPromoCodeList";
  const searchActionUrl = "promoCode/searchPromoCodeData";
  const deleteActionUrl = "promoCode/deleteMultipleData";


  const fetchdata = async () => {
    // setLoading(true);
    await axiosInstance.get(`${actionUrl}`, {
        params: {
          page: '1',
          limit: '10',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('respnse',response);
          const dataSubset = response?.data?.data.map(({ _id, promoCode, description, status}) => ({
            id: _id,
            promoCode,
            description,
            status,
            
          }));
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

    axiosInstance.post(searchActionUrl, {
      data: filterSearch,
    })
      .then((response) => {
        if (response.status === 200) {
          const dataSubset = response?.data?.data.map(({ _id, promoCode, description, status }) => ({
            id: _id,
            promoCode,
            description,
            status,
          }));
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
    if (filterSearch.trim() !== '') {
      getRowData();
    }
  }, [filterSearch]);



  // const rows = [
  //   {
  //     id: 1,
  //     // image: "/favicon.ico",
  //     title: "Snow Jon",
  //     status: "Active",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 2,
  //     // image: "/favicon.ico",
  //     title: "Lannister Cersei",
  //     status: "Active",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 3,
  //     // image: "/favicon.ico",
  //     title: "Lannister Jaime",
  //     status: "Active",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 4,
  //     // image: "/favicon.ico",
  //     title: "Stark Arya",
  //     status: "Active",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 5,
  //     // image: "/favicon.ico",
  //     title: "Targaryen Daenerys",
  //     status: "Expired",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 6,
  //     // image: "/favicon.ico",
  //     title: "Clifford Ferrara",
  //     status: "Expired",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 7,
  //     // image: "/favicon.ico",
  //     title: "Frances Rossini",
  //     status: "Expired",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 8,
  //     // image: "/favicon.ico",
  //     title: "Roxie Harvey",
  //     status: "Expired",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  // ];

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "150",
      getActions: () => [
        <GridActionsCellItem
          key="viewAction"
          icon={
            <Tooltip title="Edit">
              <Iconify icon="circum:edit" width={25} />
            </Tooltip>
          }
          label="Edit"
          // onClick={() => push(`${formUrl}/${params.id}`)}
        />,
      ],
    },

    {
      field: "promoCode",
      headerName: "Promo Code",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <Typography
            component="p"
            variant="body2"
            onClick={() => push(`${detailUrl}/${row.id}`)}
            sx={{ cursor: "pointer" }}
          >
            {row.promoCode}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: "300",
    },
    {
      field: "description",
      headerName: "Description",
      width: "300",
    },
  ];

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
PromoCode.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default PromoCode;
