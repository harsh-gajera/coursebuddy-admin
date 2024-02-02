import { Button, Card, Container, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, TablePagination, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "src/components/iconify/iconify";
import { useState } from "react";
import { WebMethods } from "src/config/Method";
import MasterForm from "src/view/master-form";
import TableView from "./table-view";
import DeleteModel from "./delete-model";
import SearchView from "./search-view";
import PointTableTableView from "./pointtable-tableview";

export default function PointTableView ({
    handleOpenForm,
    handleCloseForm,
    handleSubmitForm,
    handleUpdateForm,
    handleDeleteForm,
    handleUpdateModal,
    handleDeleteModal,
    handleScroll,
    handleSearch,
    handleTableSort,
    handlePageLimit
}) {

    const reduxStore = WebMethods.GetReduxStore()

    const [openInfo,setOpenInfo] = useState(false)

    return <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">{reduxStore.pageRights.pageName}</Typography>
            {
                reduxStore.pageRights.addForm &&
                <Button variant="contained" color="inherit" onClick={handleOpenForm} startIcon={<Iconify icon="eva:plus-fill" />}>
                    New {reduxStore.pageRights.formName}
                </Button>
            }
        </Stack>

        {/* Form Model */}
        <Dialog open={reduxStore.modal.form || reduxStore.modal.update} maxWidth={reduxStore.pageRights.formSize || "sm"} fullWidth>
            <MasterForm 
                handleSubmitForm={handleSubmitForm}
                handleCloseForm={handleCloseForm}
                handleUpdateForm={handleUpdateForm}
            />
        </Dialog>

        <Dialog open={openInfo} maxWidth="sm" fullWidth>
            <DialogContent>
                <Typography variant="h5" style={{marginBottom:'16px'}}>Point Rule Details</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography>Vendor Name :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography >
                        {openInfo.companyname}
                        </Typography>
                    </Grid>
                {
                    openInfo?.pointtype && 
                    <>
                        <Grid item xs={4}>
                            <Typography>Point Type :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo.pointtype == 1 ? 'Fixed' : openInfo.pointtype == 2 ? 'Percentage (%)' : 'Honorary' }
                            </Typography>
                        </Grid>
                    </>
                }
                {
                    openInfo?.pointtype == 1 ?
                    <>
                        <Grid item xs={4}>
                            <Typography>Min Amount :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.minamount}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Max Amount :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.maxamount}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Reward Point :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.rewardpoint}
                            </Typography>
                        </Grid>
                    </>
                    : 
                    openInfo?.pointtype == 2 ?
                    <>
                        {/* <Typography variant="body1">Max Amount: {openInfo?.percentage}</Typography> */}
                        <Grid item xs={4}>
                            <Typography>Percentage :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.percentage}
                            </Typography>
                        </Grid>
                    </>
                    :
                    <>
                        <Grid item xs={4}>
                            <Typography>Start Date :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.startdate}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>End Date :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.enddate}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Reward Point :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography >
                            {openInfo?.rewardpoint}
                            </Typography>
                        </Grid>
                    </>
                }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpenInfo(false)} variant="outlined" color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

        <DeleteModel
            handleCloseForm={handleCloseForm}
            handleDeleteForm={handleDeleteForm}
        />

        <Card>

            <SearchView 
                handleSearch={handleSearch}
            />

            <PointTableTableView
                handleUpdateForm={handleUpdateForm}
                handleUpdateModal={handleUpdateModal}
                handleDeleteModal={handleDeleteModal}
                handleScroll={handleScroll}
                handleTableSort={handleTableSort}
                setOpenInfo={setOpenInfo}
            />

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" margin={1}>
                <div>Items per page: &nbsp;
                <Select value={reduxStore.pageLimit} 
                    onChange={handlePageLimit}
                    className="pagination-select-menu"
                >
                    { [10, 20, 50].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                    ))}
                </Select>
                </div>
                <div style={{margin: '0px 30px'}}>Total Items: &nbsp;{reduxStore.data.length}</div>
            </Stack>


        </Card>

    </Container>
}

PointTableView.propTypes = {
    handleOpenForm: PropTypes.func,
    handleCloseForm: PropTypes.func,
    handleSubmitForm: PropTypes.func,
    handleUpdateForm: PropTypes.func,
    handleDeleteForm: PropTypes.func,
    handleUpdateModal: PropTypes.func,
    handleDeleteModal: PropTypes.func,
    handleScroll: PropTypes.func,
    handleSearch: PropTypes.func,
    handleTableSort: PropTypes.func,
    handlePageLimit: PropTypes.func,
  };
  