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


const Notification = () => {
  const { push } = useRouter();
  const [pageData, setPageData] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const title = "Notifications";
  const DASHBOARD_TITLE = "Dashboard";
  const formUrl = `${PATH_DASHBOARD.notification.notifications}/form`;
  const detailUrl = `${PATH_DASHBOARD.notification.notifications}/detail`;
  const actionUrl = "notification/getAllNotificationList";
  const deleteActionUrl = "notification/deleteMultipleData";
  const searchActionUrl = "notification/searchNotification";

  
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
          const dataSubset = response?.data?.data.map(({ _id,image, title, description, type }) => ({
            id: _id,
            image,
            title,
            description,
            type,
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
          const dataSubset = response?.data?.data.map(({ _id,image, title, description, type }) => ({
            id: _id,
            image,
            title,
            description,
            type,
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
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Snow Jon",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 2,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Lannister Cersei",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 3,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Lannister Jaime",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 4,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Stark Arya",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 5,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Targaryen Daenerys",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 6,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Clifford Ferrara",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 7,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Frances Rossini",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //   },
  //   {
  //     id: 8,
  //     type:"Customer",
  //     image: "/assets/not-found/no_image.png",
  //     title: "Roxie Harvey",
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
    {
      field: "image",
      headerName: "Image",
      width: "150",
      renderCell: ({ row }) => {
        return <Avatar variant="rounded" src={row?.image} alt={row?.title} />;
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <Typography
            component="p"
            variant="body2"
            onClick={() => push(`${detailUrl}/${row.id}`)}
            sx={{ cursor: "pointer" }}
          >
            {row.title}
          </Typography>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: "300",
    },
    {
      field: "description",
      headerName: "Description",
      width: "300",
    },
  ];

  console.log("pageData",pageData);

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
Notification.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Notification;
