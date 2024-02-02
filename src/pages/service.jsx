import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function ServicePage() {

    const dispatch = WebMethods.GetReduxDispatch()

    // form field
    const formFields = [
      { name: 'service', label: 'Service', type : 'text', gridSize : 12 }
    ];

    const formValidation = {
        service: yup.string().required('Service is required')
    }

    const tableViewFields = [
      { name : 'companyname', label: 'Vendor Name', type : 'text' },
      { name: 'service', label: 'Service' },
      { name : 'isapproved', label: 'Status', type : 'label', canflagupdate : true },
    ]

    const pageRights = { pageName : 'Service Master', formName : 'Service', apiName : WebMethods.GetPageName(), formSize : 'sm', addForm : true, isViewUpdateDelete : false, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Service </title>
      </Helmet>

      <MasterController />
    </>
  );
}
