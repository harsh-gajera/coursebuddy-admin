import { Button, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify';
import serverURL from 'src/config/Config';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function CustomerPage() {

    const dispatch = WebMethods.GetReduxDispatch()

    // form field
    const formFields = [
        { title: 'Personal Details', type : 'subtitle' },
        { name: 'title', label: 'Title', type : 'text', gridSize : 6 },
        { name: 'firstname', label: 'First Name', type : 'text', gridSize : 6 },
        { name: 'lastname', label: 'Last Name', type : 'text', gridSize : 6 },
        { name: 'birthdate', label: 'Birth Date', type : 'date', gridSize : 6 },
        { name: 'gender', label: 'Gender', type : 'radio', 
          radiooptions : [{label : 'Male',value : 'male'},{label : 'Female',value : 'female'},{label : 'Other',value : 'other'}] ,
          gridSize : 6
        },
        { name: 'marriedstatus', label: 'Married Status', type : 'radio',
          radiooptions : [{label : 'Married',value : '1'},{label : 'Not Married',value : '0'}] ,
          gridSize : 6,
        },
        { name: 'anniversarydate', label: 'Anniversary Date', type : 'date', isdependentfield : 1 , dependency : { key : 'marriedstatus', value : '1'}, gridSize : 6 },

        { title: 'Contact Details', type : 'subtitle' },
        { name: 'email', label: 'Email', type : 'text', gridSize : 6 },
        { name: 'contactno', label: 'Phone', type : 'number', gridSize : 6 },
        { name: 'address', label: 'Address', type : 'textarea', gridSize : 6 },
        { name: 'addresstype', label: 'Above mentioned address is a', type : 'radio', 
          radiooptions : [{label : 'Home Address or',value : 0},{label : 'Office Address',value : 1}] ,
          gridSize : 6
        },

        { title: 'Other Details', type : 'subtitle' },
        { name: 'communicationtype', label: 'Communication Preference', type : 'radio', 
          radiooptions : [{label : 'Email',value : 0},{label : 'SMS',value : 1}, {label : 'Whatsapp',value : 2}] ,
          gridSize : 6
        },
        { name: 'reference', label: 'How do you come to know about Luxellite? ', type : 'dropdown', staticdropdowndata : [{value : 'Online',label : 'Online'},{value : 'Friends',label : 'Friends'},{value : 'Others',label : 'Others'}], masterdata : 'reference', gridSize : 6 },
        { name: 'regularupdate', label: 'Do you wish to get regular updates and offers from us?', type : 'radio', 
          radiooptions : [{label : 'Yes',value : 1},{label : 'No',value : 0}] ,
          gridSize : 6
        },
    ];

    const formValidation = {
        title: yup.string().required('Title is required'),
        firstname: yup.string().required('First Name is required'),
        lastname: yup.string().required('Last Name is required'),
        birthdate: yup.string().required('Birth Date is required'),

        email: yup.string().email('Invalid email format').required('Email is required'),
        contactno : yup.string()
            .matches(/^[0-9]{10}$/, 'Invalid mobile number')
            .required('Mobile number is required'),
        address: yup.string().required('Address is required'),
        addresstype: yup.number().required('Address Type is required'),

        communicationtype: yup.number().required('Communication Preference is required'),
        reference: yup.string().required('Reference is required'),
        regularupdate: yup.number().required('Regular Update is required'),
        gender: yup.string().required('Gender is required'),
        marriedstatus: yup.string().required('Married Status is required'),
        anniversarydate: yup.string(),
    }

    const tableViewFields = [
        { name: 'companyname', label: 'Vendor Name' },
        { name: 'fullname', label: 'Customer Name' },
        { name: 'email', label: 'Email' },
        { name: 'contactno', label: 'Phone' },
        { name: 'totalpointavailable', label: 'Point Available' },
        { name: 'qrcodeurl', label: 'QR Link', type : 'link' },
    ]

    const pageRights = { pageName : 'Customers', formName : 'Customer', apiName : WebMethods.GetPageName(), formSize : 'md', addForm : true, isViewUpdateDelete : true, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

    const [formdata,setFormData] = useState({password1 : '',password2 : ''})
    const [isView,setIsView] = useState(false)
    const [showPassword1,setShowPassword1] = useState(false)
    const [showPassword2,setShowPassword2] = useState(false)
    const [disabledbutton,setDisabledbutton] = useState(false)

    const checkLoginValid = async () => {
      const response = await WebMethods.GetListRequest(`${serverURL}checkcustomerlogin`, {})
      if(response.status == 200 && response.data.length){
        let data = response.data[0]
        if(Number(data.endtime) > Date.now()){
          setIsView(true)
        }
      }
    }

    useEffect(()=>{
      checkLoginValid()
    },[])

    const handlePasswordCheck = async () => {
      if(formdata.password1.length && formdata.password2.length){
        setDisabledbutton(true)
        const response = await WebMethods.InsertRequest(`${serverURL}customerlogin`, formdata);

        if(response.status == 200){
          WebMethods.Notification(response.message, response.status)
          setIsView(true)
          setDisabledbutton(false)
        }else{
          WebMethods.Notification(response.message)
          setDisabledbutton(false)
        }
      }else{
        WebMethods.Notification('Please fill up all form fields.')
      }
    }

  return (
    <>
      <Helmet>
        <title> Customers </title>
      </Helmet>

      {
        isView ?
          <MasterController />
        :
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4">Customers</Typography>
          </Stack>
          <Grid container xs={4} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPassword1 ? 'text' : 'password'}
                name='password1'
                label='Password 1'
                variant="outlined"
                margin="normal"
                value={formdata.password1}
                onChange={({target})=> setFormData( p => ({...p,[target.name] : target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                        <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPassword2 ? 'text' : 'password'}
                name='password2'
                label='Password 2'
                variant="outlined"
                margin="normal"
                value={formdata.password2}
                onChange={({target})=> setFormData( p => ({...p,[target.name] : target.value }))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                        <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button onClick={handlePasswordCheck} disabled={disabledbutton} type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Container>
      }
     
    </>
  );
}
