import { Button, Card, Container, Dialog, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, TablePagination, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "src/components/iconify/iconify";
import { WebMethods } from "src/config/Method";
import MasterForm from "src/view/master-form";
import TableView from "./table-view";
import DeleteModel from "./delete-model";
import SearchView from "./search-view";

export default function MasterView ({
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
    handlePageLimit,
    handleDownloadExcel
}) {

    const reduxStore = WebMethods.GetReduxStore()

    return <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">{reduxStore.pageRights.pageName}</Typography>
            {
                reduxStore.pageRights.apiName === 'customer' ?
                    <Typography variant="h5">{`${reduxStore.loginData.gettingpoint?.toFixed(2)} (Redeem) / ${reduxStore.loginData.givenpoint?.toFixed(2)} (Reward)`}</Typography>
                : null
            }
            {
                reduxStore.pageRights.apiName === 'pointreport' ?
                    <Typography variant="h5">{`${reduxStore.loginData.totalgivenpoint?.toFixed(2)} (Total Given) || ${reduxStore.loginData.totalgettingpoint?.toFixed(2)} (Total Getting) || ${(reduxStore.loginData.totalgivenpoint - reduxStore.loginData.totalgettingpoint)?.toFixed(2)} (Customer Has)`}</Typography>
                : null
            }
            {
                reduxStore.pageRights.addForm &&
                <Button variant="contained" color="inherit" onClick={handleOpenForm} startIcon={<Iconify icon="eva:plus-fill" />}>
                    New {reduxStore.pageRights.formName}
                </Button>
            }
            {
                reduxStore.pageRights.exportCSV &&
                <Button disabled={reduxStore.disabledbutton.export} variant="contained" color="inherit" onClick={handleDownloadExcel}>
                    Export CSV
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

        <DeleteModel
            handleCloseForm={handleCloseForm}
            handleDeleteForm={handleDeleteForm}
        />

        <Card>

            <SearchView 
                handleSearch={handleSearch}
            />

            <TableView
                handleUpdateForm={handleUpdateForm}
                handleUpdateModal={handleUpdateModal}
                handleDeleteModal={handleDeleteModal}
                handleScroll={handleScroll}
                handleTableSort={handleTableSort}
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

MasterView.propTypes = {
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
    handleDownloadExcel: PropTypes.func,
  };
  