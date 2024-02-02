import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function VendorPage() {

    const dispatch = WebMethods.GetReduxDispatch()

    // form field
    const formFields = [
      { title: 'Partner Contact', type : 'subtitle' },
      { name: 'companyname', label: 'Company Name', type : 'text', gridSize : 6 },
      { name: 'telephone', label: 'Telephone', type : 'number', gridSize : 6 },
      { name: 'mailingaddress', label: 'Mailing Address', type : 'text', gridSize : 6 },
      { name: 'vendorcategoryid', label: 'Vendor Category', type : 'dropdown', masterdataapi : 'vendor-category', masterdata : 'vendorcategory', dropdownlabelfield : 'vendorcategory', gridSize : 6 },
      { name: 'logo', label: 'Logo', type : 'file', gridSize : 6 },
      { name: 'email', label: 'Email', type : 'text', gridSize : 6 },
      { name: 'website', label: 'Website', type : 'text', gridSize : 6 },
      { name: 'contactname', label: 'Point of Contact Name & Title', type : 'text', gridSize : 6 },
      { name: 'contactemail', label: 'Contact Email', type : 'text', gridSize : 6 },
      { name: 'contactno1', label: 'Contact No. 1', type : 'number', gridSize : 6 },
      { name: 'contactno2', label: 'Contact No. 2', type : 'number', gridSize : 6 },
      { name: 'gstno', label: 'GST Number', type : 'text', gridSize : 6 },
      { name: 'allowedcustomer', label: 'Allowed Customer Size', type : 'number', gridSize : 6 },
      
      { title: 'Partner Overview', type : 'subtitle' },
      { name: 'servicedetails', label: 'General Details of Services/ Goods', type : 'text', gridSize : 6 },
      { name: 'businesstype', label: 'Business Type', type : 'text', gridSize : 6 },
      { name: 'establishmentdate', label: 'Date of Company Establishment', type : 'date', gridSize : 6 },
      { name: 'grossannualturnover', label: 'Gross Annual Turnover', type : 'number', gridSize : 6 },
      { name: 'legalstructure', label: 'Legal Structure', type : 'text', gridSize : 6 },
      { name: 'customersize', label: 'Approximate Customer Size', type : 'number', gridSize : 6 },
      { name: 'googlelocation', label: 'Google Location', type : 'text', gridSize : 6 },
      
      { title: 'Banking Information', type : 'subtitle' },
      { name: 'bankname', label: 'Bank Name', type : 'text', gridSize : 6 },
      { name: 'beneficiaryname', label: 'Beneficiary Name', type : 'text', gridSize : 6 },
      { name: 'accountnumber', label: 'Account Number', type : 'number', gridSize : 6 },
      { name: 'bankaddress', label: 'Bank Address', type : 'text', gridSize : 6 },
      
      { title: 'Credentials', type : 'subtitle', updatehide : true },
      // { name: 'username', label: 'Username', type : 'text', gridSize : 6 },
      { name: 'password', label: 'Password', type : 'text', updatehide : true, gridSize : 6 },
    ]

    const formValidation = {
      companyname: yup.string().required('Company name is required'),
      vendorcategoryid: yup.string().required('Vendor Category is required'),
      telephone: yup.number().required('Telephone Number is required'),
      mailingaddress: yup.string().required('Mailing Address is required'),
      logo: yup.string().required('Logo is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      website: yup.string().required('Website is required'),
      contactname: yup.string().required('Contact Name is required'),
      contactemail: yup.string().email('Invalid email format').required('Contact Email is required'),
      contactno1 : yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Contact Number is required'),
      contactno2 : yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Contact Number is required'),
      gstno: yup.string().matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[1-9A-Z]{1})$/, 'Invalid GST number').required('GST Number is required'),
      allowedcustomer: yup.number().required('Allowed Customer Size is required'),

      servicedetails: yup.string().required('Details of Services is required'),
      businesstype: yup.string().required('Business Type is required'),
      establishmentdate: yup.string().required('Company Establishment Date is required'),
      grossannualturnover: yup.number().required('Gross Annual Turnover is required'),
      legalstructure: yup.string().required('Legal Structure is required'),
      customersize: yup.number().required('Customer Size is required'),
      googlelocation: yup.string().required('Google Location is required'),
      
      bankname: yup.string().required('Bank Name is required'),
      beneficiaryname: yup.string().required('Beneficiary Name is required'),
      accountnumber: yup.number().required('Account Number is required'),
      bankaddress: yup.string().required('Bank Address is required'),

      // username: yup.string().required('Username is required'),
      password: yup
        .string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character'
        ),
    }

    const tableViewFields = [
        { name : 'logo', label: 'Logo', type : 'file' },
        { name : 'companyname', label: 'Company Name' },
        { name : 'vendorcategory', label: 'Vendor Category' },
        { name : 'contactname', label: 'Contact Person' },
        { name : 'email', label: 'Email' },
        { name : 'contactno1', label: 'Contact Number', align: 'center' },
        { name : 'gstno', label: 'GST Number' },
        // { name : 'username', label: 'User Name' },
        // { name : 'password', label: 'Password' }
    ]

    const pageRights = { pageName : 'Vendors', formName : 'Vendor', apiName : WebMethods.GetPageName(), formSize : 'md', addForm : true, isViewUpdateDelete : true, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Vendors </title>
      </Helmet>

      <MasterController />
    </>
  );
}
