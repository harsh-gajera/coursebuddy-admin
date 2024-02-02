import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { WebMethods } from 'src/config/Method';

const DeleteModel = ({ open, handleCloseForm, handleDeleteForm }) => {
  const [confirmationInput, setConfirmationInput] = useState('');

  const reduxStore = WebMethods.GetReduxStore()

  const handleInputChange = (event) => {
    setConfirmationInput(event.target.value.toUpperCase());
  };

  const handleConfirmDelete = () => {
    if (confirmationInput.toUpperCase() === 'DELETE') {
      handleDeleteForm();
      setConfirmationInput('')
    }
  };

  return (
    <Dialog open={reduxStore.modal.delete} maxWidth="xs" fullWidth>
      <DialogTitle style={{color :'red' }}>
        <Typography fontSize={20} fontWeight={700}>
            Are You Sure!
        </Typography>
        </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: '16px' }}>
          Please type <strong style={{color :'red' }}>&quot;DELETE&quot;</strong> for confirmation
        </DialogContentText>
        <TextField
          label="Type 'DELETE' to confirm"
          variant="outlined"
          fullWidth
          value={confirmationInput}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmDelete} variant="contained" color="secondary" disabled={confirmationInput.toLowerCase() !== 'delete' || reduxStore.disabledbutton.delete}>
          Delete
        </Button>
        <Button onClick={()=>{setConfirmationInput(''); handleCloseForm()}} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModel.propTypes = {
    open: PropTypes.any,
    handleCloseForm: PropTypes.func,
    handleDeleteForm: PropTypes.func
  };

export default DeleteModel;
