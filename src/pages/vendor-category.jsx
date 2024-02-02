import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function VendorCategoryPage() {

    const dispatch = WebMethods.GetReduxDispatch()

     // form field
    const formFields = [
      { name: 'vendorcategory', label: 'Vendor Category', type : 'text', gridSize : 12 },
    ];

    const formValidation = {
      vendorcategory: yup.string().required('Vendor Category is required'),
    };

    const tableViewFields = [
      { name : 'vendorcategory', label: 'Vendor Category', type : 'text' },
    ]

    const pageRights = { pageName : 'Vendors Category Master', formName : 'Vendor Category', apiName : WebMethods.GetPageName(), formSize : 'sm', addForm : true, isViewUpdateDelete : true, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Vendors Category </title>
      </Helmet>

      <MasterController />
    </>
  );
}
