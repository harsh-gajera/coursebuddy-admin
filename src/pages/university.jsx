import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function UniversityPage() {

    const dispatch = WebMethods.GetReduxDispatch()

     // form field
    const formFields = [
      { name: 'university', label: 'University', type : 'text', gridSize : 12 },
      { name: 'image', label: 'Logo', type : 'file', gridSize : 12 },
    ];

    const formValidation = {
      university: yup.string().required('University is required'),
      image: yup.string().required('Logo is required'),
    };

    const tableViewFields = [
      { name : 'image', label: 'Logo', type : 'file' },
      { name : 'university', label: 'University', type : 'text' },
    ]

    const pageRights = { pageName : 'University Master', formName : 'University', apiName : WebMethods.GetPageName(), formSize : 'sm', addForm : true, isViewUpdateDelete : true, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> University </title>
      </Helmet>

      <MasterController />
    </>
  );
}
