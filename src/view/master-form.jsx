import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { WebMethods } from 'src/config/Method';
import {
  TextField,
  Button,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material';

const MasterForm = ({handleSubmitForm, handleCloseForm, handleUpdateForm }) => {

  const reduxStore = WebMethods.GetReduxStore()
  const { formFields, formValidation, modal, formData, disabledbutton } = reduxStore

  let isUpdateForm = modal.update

  const formik = useFormik({
    initialValues: formData,
    validationSchema : yup.object(formValidation),
    onSubmit: (values) => {
      // console.log(values)
      if(isUpdateForm){
        handleUpdateForm(values)
      }else{
        handleSubmitForm(values)
      }
    },
  });
  
  console.log(formik.values, formik.errors)
  return (
    <>
     <DialogTitle style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 2 }}>{isUpdateForm ? 'Update' : 'Create'} {reduxStore.pageRights.formName}</DialogTitle>
    <form onSubmit={formik.handleSubmit}>
    <DialogContent>
      <Grid container spacing={2}>
      {formFields.filter( o => { 
        // fordependency hide or show
        if(o.isdependentfield){
          return formik.values[o.dependency.key] === o.dependency.value
        }
        if(o.updatehide && isUpdateForm){
          return false
        }
        return true
       }).map((field) => {
        // console.log(field?.isdependentfield && formik.values[field.dependency.key] === field.dependency.value)
        return (
          <>
            {
           field.type === 'subtitle' ? 
           <Grid item xs={12}>
              <Typography variant="h6">
               {field.title}
              </Typography>
            </Grid>
           :
           field.type === 'file' ? (
            <>
              {/* <Input
                type="file"
                margin="normal"
                name={field.name}
                fullWidth
                onChange={(e) =>{console.log(e.target.files); formik.setFieldValue(field.name, e.target.files[0])}}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                inputProps={{ accept: 'image/*' }}
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>
              )} */}

              <Grid item xs={field.gridSize} style={{marginBottom: '16px' }}>
                <Typography style={{ marginBottom: '8px', display: 'block' }}>
                  {field.label}
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => formik.setFieldValue(field.name, event.currentTarget.files[0])}
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>
                )}
              </Grid>
            </>
          ) 
          :
          field.type === 'number' ? 
            <Grid item xs={field.gridSize}>
              <TextField
                type="number"
                label={field.label}
                fullWidth
                margin="normal"
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
              />
            </Grid>
          :
          field.type === 'radio' ? 
          <Grid item xs={field.gridSize}>
            <FormLabel id="demo-row-radio-buttons-group-label">{field.label}</FormLabel>
            <RadioGroup
              row
              aria-label={field.name}
              id={field.name}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
            {field?.radiooptions?.map((obj) => (
              <FormControlLabel
                key={obj.value}
                value={obj.value}
                control={<Radio />}
                label={obj.label}
              />
            ))}
          </RadioGroup>
  
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>
          )}
          </Grid>
        :
          field.type === 'textarea' ? 
            <Grid item xs={field.gridSize}>
              <TextField
                label={field.label}
                multiline
                margin="normal"
                rows={3}
                fullWidth
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
              />
            </Grid>
          :
          field.type === 'date' ?
          <Grid item xs={field.gridSize}>
            <TextField
              type="date"
              margin="normal"
              label={field.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
              id={field.name}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
            />
          </Grid>
          :
          field.type === 'dropdown' ?
          <Grid item xs={field.gridSize} className='form-dropdown-field'>
            <FormControl fullWidth>
              <InputLabel id="country-label">{field.label}</InputLabel>
              <Select
                // labelId="country-label"
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                MenuProps={{
                  style: { maxHeight: '400px' },
                }}
              >
                <MenuItem value="" disabled>
                  Select {field.label}
                </MenuItem>
                {
                  reduxStore.masterData[field.masterdata]?.length ? 
                    reduxStore.masterData[field.masterdata].map((obj) => (
                      <MenuItem key={obj.value} value={obj.value}>
                        {obj.label}
                      </MenuItem>
                    ))
                  : null
                }
              </Select>
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>
              )}
            </FormControl>
          </Grid>
          :
          <Grid item xs={field.gridSize}>
            <TextField
              key={field.name}
              fullWidth
              id={field.name}
              name={field.name}
              label={field.label}
              variant="outlined"
              margin="normal"
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
            />
            </Grid>
          }
        </>
        )
      })}
      </Grid>
    </DialogContent>
       <DialogActions style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', zIndex: 1 }}>
          <Button disabled={disabledbutton.submit} type="submit" variant="contained" color="primary">
            {isUpdateForm ? 'Update' : 'Create'}
          </Button>
          <Button onClick={handleCloseForm} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
    </form>
    </>
  );
};

MasterForm.propTypes = {
    handleSubmitForm: PropTypes.func,
    handleCloseForm: PropTypes.func,
    handleUpdateForm: PropTypes.func,
};

export default MasterForm;
