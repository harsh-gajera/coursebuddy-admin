import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function CustomerCategoryPage() {

    const dispatch = WebMethods.GetReduxDispatch()

    // form field
    const formFields = [
        { name: 'customercategory', label: 'Customer Category', type : 'text', gridSize : 12 },
        { name : 'totalpurchase', label: 'Total Purchase', type : 'number', gridSize : 12 },
    ];

    const formValidation = {
        customercategory: yup.string().required('Customer Category is required'),
        totalpurchase: yup.number().required('Total Purchase is required'),
    };

    const tableViewFields = [
        { name : 'customercategory', label: 'Customer Category', type : 'text' },
        { name : 'totalpurchase', label: 'Total Purchase', type : 'number' },
    ]

    const pageRights = { pageName : 'Customers Category Master', formName : 'Customer Category', apiName : WebMethods.GetPageName(), formSize : 'sm', addForm : true, isViewUpdateDelete : true, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Customers Category </title>
      </Helmet>

      <MasterController />
    </>
  );
}
