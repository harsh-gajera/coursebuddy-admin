import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Scrollbar from 'src/components/scrollbar';
import { Avatar, Button, Chip, IconButton, Link, MenuItem, Paper, Popover, Table, TableBody, TableContainer, Typography } from '@mui/material';
import { WebMethods } from 'src/config/Method';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

export default function TableView({
  handleUpdateForm,
  handleUpdateModal,
  handleDeleteModal,
  handleScroll,
  handleTableSort
}) {

  const [open, setOpen] = useState(null)
  const [clickData, setClickData] = useState(null)

  const reduxStore = WebMethods.GetReduxStore()
  const { tableViewFields, pageRights, data: viewData, sort, searchText  } = reduxStore

  const navigate = useNavigate();

  return (
    <Scrollbar>
      <TableContainer 
        onScroll={handleScroll}  
        // style={{minHeight : 'calc(100vh - 400px)', border :'1px solid'}}
        style={{ minHeight : '325px', maxHeight: '325px', overflowY: 'auto' }}
      >
        <Table sx={{ minWidth: 800 }}>

          <TableHead className="sticky-header">
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                />
              </TableCell> */}

              {tableViewFields?.map((headCell) => (
                <TableCell
                  key={headCell.name}
                  align={headCell.align || 'left'}
                  // sortDirection={orderBy === headCell.name ? order : false}
                  // sortDirection='asc'
                  // sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                >
                  {
                    headCell.notsortable ? 
                      headCell.label 
                    :
                      <TableSortLabel
                        // hideSortIcon
                        active={Object.prototype.hasOwnProperty.call(sort, headCell.name)}
                        direction={sort[headCell.name] > 0 ? 'asc' : 'desc'}
                        onClick={() => handleTableSort(headCell.name)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                  }
                </TableCell>
              ))}
              {/* for edit, delete specing */}
              {
                pageRights?.isViewUpdateDelete && <TableCell/>
              }
            </TableRow>
          </TableHead>

          <TableBody>
            
              {/* <TableCell padding="checkbox">
                <Checkbox disableRipple checked={selected} onChange={handleClick} />
              </TableCell> */}

              {/* <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt={name} src={avatarUrl} />
                  <Typography variant="subtitle2" noWrap>
                    {name}
                  </Typography>
                </Stack>
              </TableCell> */}

              {
                viewData.length ? viewData.map( data => {
                  return <TableRow hover tabIndex={-1} role="checkbox">
                    { tableViewFields.map( (obj) => {
                      return (
                        obj.type === 'file' ?
                          <TableCell>
                            {/* <Avatar alt='img' src='https://harshgajera.s3.amazonaws.com/projects/chat.png'/> */}
                            {/* <Avatar alt='img' src={data[obj.name]}/> */}
                            {console.log(WebMethods.getImageUrl(data[obj.name]),data[obj.name])}
                            <Avatar alt='img' src={WebMethods.getImageUrl(data[obj.name])}/>
                          </TableCell>
                        :
                        obj.type === 'label' ?
                          <TableCell>
                            {
                              data[obj.name] === 1 ?
                                <Chip label="Approve" color="success" />
                              :
                              data[obj.name] === 2 ?
                                <Chip label="Reject" color="error" />
                              :
                                <Chip label="Pending" color="warning" />
                            }
                            {data[obj.name] === 0 && obj.canflagupdate && (
                              <>
                                <Button color="primary" onClick={()=> handleUpdateForm({...data, isapproved : 1})}>
                                  Approve
                                </Button>
                                <Button color="error" onClick={()=> handleUpdateForm({...data, isapproved : 2})}>
                                  Reject
                                </Button>
                              </>
                            )}
                          </TableCell>
                          :
                          obj.type === 'date' ?
                            <TableCell>{WebMethods.getDateFormat(data[obj.name])}</TableCell>
                          :
                          obj.type === 'link' ?
                            <TableCell>
                              <Iconify onClick={()=> navigator.clipboard.writeText(data[obj.name])} icon="mingcute:copy-2-fill" sx={{ mr: 2, cursor: 'pointer' }} />
                              <Link href={data[obj.name]} target="_blank"><Iconify icon="tabler:send" sx={{ mr: 2, cursor: 'pointer' }} /></Link>
                            </TableCell>
                          :
                          <>
                          {
                            obj.name == 'amounttype' ?
                             <TableCell>{data[obj.name] == 1 ? <span style={{ color: 'green' }}>Credit</span> : <span style={{ color: 'red' }}>Debit</span> }</TableCell>
                            :
                            obj.name == 'pointtype' ?
                              <TableCell>{data[obj.name] == 1 ? 'Fixed' : data[obj.name] == 2 ? 'Percentage (%)' : 'Honorary' }</TableCell>
                            :
                            obj.name == 'rewardpoint' ?
                              <TableCell>{data.percentage ? data.percentage : data[obj.name]}</TableCell>
                            :
                            obj.name == 'companyname' && pageRights.apiName == 'vendor' ?
                              <TableCell onClick={()=>navigate(`/pointtable?_id=${data._id}`)}>{data[obj.name]}</TableCell>
                            :
                              <TableCell>{data[obj.name]}</TableCell>
                          }
                          </>
                        )
                      })
                    }

                    {
                      pageRights?.isViewUpdateDelete && <TableCell align="right">
                        <IconButton onClick={(e)=>{setClickData(data); setOpen(e.currentTarget)}}>
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      </TableCell>
                    }

                    <Popover
                      open={!!open}
                      anchorEl={open}
                      onClose={()=>setOpen(null)}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        sx: { width: 140 },
                      }}
                    >
                      {
                        pageRights?.update &&  <MenuItem onClick={()=>{handleUpdateModal(clickData); setOpen(null)}}>
                            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                            Edit
                          </MenuItem>
                      }
                      {
                        pageRights?.delete && <MenuItem onClick={()=>{handleDeleteModal(clickData); setOpen(null)}} sx={{ color: 'error.main' }}>
                            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                            Delete
                          </MenuItem>
                      }
                    </Popover>

                  </TableRow>
                })
                :
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 8 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>
            
                      <Typography variant="body2">
                        No results found {searchText.length ?<>for &nbsp;<strong>&quot;{searchText}&quot;</strong>.</> : '' }
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              }

          </TableBody>

        </Table>
      </TableContainer>
    </Scrollbar>
  );
}

TableView.propTypes = {
  handleUpdateForm: PropTypes.func,
  handleUpdateModal: PropTypes.func,
  handleDeleteModal: PropTypes.func,
  handleScroll: PropTypes.func,
  handleTableSort: PropTypes.func,
};
