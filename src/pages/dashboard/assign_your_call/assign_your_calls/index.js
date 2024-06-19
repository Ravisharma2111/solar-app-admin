"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { PATH_DASHBOARD } from "@/routes/paths";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import Label from "@/components/label";
import CommonDialog from "@/components/dialog/common-dialog";
import { useFormik } from "formik";
import {
  AddAssignJobForm,
  ListAssignJobForm,
} from "@/sections/dashboard/assign_your_call";
import  axiosInstance  from "../../../../utils/axios";


const CustomerManagement = () => {
  const { push } = useRouter();
  const [openForm, setOpenForm] = React.useState(false);
  const [pageData, setPageData] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  const [openModel, setOpenModel] = React.useState(false);
  const title = "Assign Your Calls";
  const DASHBOARD_TITLE = "Dashboard";
  const formUrl = `${PATH_DASHBOARD.assign_your_call.assign_your_calls}/form`;
  const detailUrl = `${PATH_DASHBOARD.assign_your_call.assign_your_calls}/detail`;
  const actionUrl = "assignCall/getAllAssignCalls";
  const searchActionUrl = "assignCall/searchAssignCall";
  const deleteActionUrl = "assignCall/deleteMultipleData";

  const formik = useFormik({
    initialValues: {
      name: "",
      // email: "",
      // mobile: "",
      // city: "",
      // status: "",
      // address: "",
      // state: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "User name is required";
      }
      // if (!values.email) {
      //   errors.email = "Email is required";
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      // ) {
      //   errors.email = "Invalid email address";
      // }
      // if (!values.mobile) {
      //   errors.mobile = "Mobile no. is required";
      // }
      // if (!values.city) {
      //   errors.city = "City is required";
      // }
      // if (!values.state) {
      //   errors.state = "State is required";
      // }
      // if (!values.status) {
      //   errors.status = "Status is required";
      // }
      // if (!values.address) {
      //   errors.address = "Address is required";
      // }
      return errors;
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = actionUrl;
      if (id != "new") {
        method = "PUT";
        url = `${actionUrl}/${id}`;
      }

      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(response.data.message, {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          // show error message
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });

          // set server error
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.errors[key]) {
                setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });
  const handleClose = () => {
    setOpenForm(false);
    formik.resetForm();
  };

  const handleModel = () => {
    setOpenModel(false);
    formik.resetForm();
  };

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
  //     name: "Snow Jon",
  //     email: "snowjon@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 2,
  //     name: "Lannister Cersei",
  //     email: "lannistercersei@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 3,
  //     name: "Lannister Jaime",
  //     email: "lannisterjaime@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 4,
  //     name: "Stark Arya",
  //     email: "starkarya@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 5,
  //     name: "Targaryen Daenerys",
  //     email: "targaryendaenerys@gmail.com",
  //     mobile: "1234567890",
  //     status: true,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 6,
  //     name: "Clifford Ferrara",
  //     email: "cliffordferrara@gmail.com",
  //     mobile: "1234567890",
  //     status: false,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 7,
  //     name: "Frances Rossini",
  //     email: "francesrossini@gmail.com",
  //     mobile: "1234567890",
  //     status: false,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
  //   },
  //   {
  //     id: 8,
  //     name: "Roxie Harvey",
  //     email: "roxieharvey@gmail.com",
  //     mobile: "1234567890",
  //     status: false,
  //     city: "XYZ City",
  //     state: "Rajasthan",
  //     address: "Lorean Ipsum XYZ",
  //     pincode: "123456",
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
          key="assign_job"
          icon={
            <Tooltip title="Assign Job">
              <Iconify icon="clarity:assign-user-solid" width={25} />
            </Tooltip>
          }
          label="Assign Job"
          onClick={() => setOpenForm(true)}
        />,
        <GridActionsCellItem
          key="edit"
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
      field: "name",
      headerName: "Name",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <Typography
            component="p"
            variant="body2"
            onClick={() => push(`${detailUrl}/${row.id}`)}
            sx={{ cursor: "pointer" }}
          >
            {row.name}
          </Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: "300",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: "200",
    },
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

  // ... existing state and functions


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
            <Stack direction={"row"} spacing={2}>
              <Button onClick={() => setOpenModel(true)} variant="contained">
                Assign Job
              </Button>
              <Button
                component={NextLink}
                href={`${formUrl}/new`}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add
              </Button>
            </Stack>
          }
        />

        <DataTable
        deleteActionUrl={deleteActionUrl}
          rowsData={pageData}
          onFilterSearch={onFilterSearch}
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
      <CommonDialog
        title="Assign Job"
        open={openForm}
        onClose={handleClose}
        action={
          <>
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </>
        }
      >
        <Box component="form" noValidate onSubmit={() => {}}>
          <ListAssignJobForm formik={formik} />
        </Box>
      </CommonDialog>
      <CommonDialog
        title="Assign Job"
        open={openModel}
        onClose={handleModel}
        action={
          <>
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleModel}>
              Cancel
            </Button>
          </>
        }
      >
        <Box component="form" noValidate onSubmit={() => {}}>
          <AddAssignJobForm formik={formik} />
        </Box>
      </CommonDialog>
    </>
  );
};
CustomerManagement.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default CustomerManagement;
