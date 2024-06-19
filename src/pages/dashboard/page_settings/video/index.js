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
import axiosInstance from "../../../../utils/axios";

const VideoForm = () => {
  const { push } = useRouter();
  const [pageData, setPageData] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const title = "Videos";
  const DASHBOARD_TITLE = "Dashboard";
  const formUrl = `${PATH_DASHBOARD.page_settings.video}/form`;
  const detailUrl = `${PATH_DASHBOARD.solar.video}/detail`;
  const actionUrl = "video/getAllVideoList";
  const deleteActionUrl = "video/deleteMultipleData";
  const searchActionUrl = "video/searchVideo";

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
          console.log("respnse", response);
          const dataSubset = response?.data?.data.map(
            ({ _id, title, description, videoUrl }) => ({
              id: _id,
              title,
              description,
              videoUrl,
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
            ({ _id, title, description, videoUrl }) => ({
              id: _id,
              title,
              description,
              videoUrl,
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

  // const rows = [
  //   {
  //     id: 1,
  //     url: "www.abcd.com",
  //     title: "Sport",
  //     description: "Cricket",
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
    {
      field: "videoUrl",
      headerName: "Url",
      width: "300",
    },
    {
      field: "title",
      headerName: "Title",
      width: "200",
    },
    {
      field: "description",
      headerName: "Description",
      width: "300",
    },
    // {
    //   field: "state",
    //   headerName: "State",
    //   width: "300",
    // },
    // {
    //   field: "city",
    //   headerName: "City",
    //   width: "300",
    // },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   width: "300",
    // },
    // {
    //   field: "status",
    //   type: "boolean",
    //   headerName: "Status",
    //   width: "200",
    //   renderCell: ({ row }) => {
    //     return (
    //       <Label
    //         variant="soft"
    //         color={(row.status && "success") || (!row.status && "error")}
    //       >
    //         {row.status ? "Active" : "InActive"}
    //       </Label>
    //     );
    //   },
    // },
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
          onFilterSearch={onFilterSearch}
          setFilterSearch={setFilterSearch}
          filterSearch={filterSearch}
          fetchdata={fetchdata}
        />
      </ContainerComponent>
    </>
  );
};
VideoForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default VideoForm;
