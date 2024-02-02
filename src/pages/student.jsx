import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function StudentPage() {

    const dispatch = WebMethods.GetReduxDispatch()

     // form field
    const formFields = [
      { name: 'vendorcategory', label: 'Vendor Category', type : 'text', gridSize : 12 },
    ];

    const formValidation = {
      vendorcategory: yup.string().required('Vendor Category is required'),
    };

    const tableViewFields = [
      { name : 'profilepic', label: 'Picture', type : 'file' },
      { name : 'email', label: 'Email', type : 'text' },
      { name : 'fullname', label: 'Name', type : 'text' },
      { name : 'dob', label: 'Date Of Birth', type : 'date' },
      { name : 'contactno', label: 'Contact No', type : 'text' },
    ]

    const pageRights = { pageName : 'Vendors Category Master', formName : 'Vendor Category', apiName : 'user', formSize : 'sm', addForm : false, isViewUpdateDelete : false, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Students </title>
      </Helmet>

      <MasterController />
    </>
  );
}
