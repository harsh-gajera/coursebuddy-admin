import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import PointTableController from 'src/controllers/point-table-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function PointTablePage() {

    const dispatch = WebMethods.GetReduxDispatch()

    // form field
    const formFields = [
        { name: 'minamount', label: 'Minimum Amount', type : 'number' },
        { name: 'maxamount', label: 'Maximum Amount', type : 'number' },
        { name: 'rewardamount', label: 'Reward Amount', type : 'number' },
    ]

    const formValidation = {
        minamount: yup.number().required('Minimum Amount is required').min(0, 'Amount must be non-negative'),
        maxamount: yup.number()
        .required('Maximum Amount is required')
        .min(0, 'Amount must be non-negative')
        .test('maxamount', 'Max Amount must be greater than Min Amount', (value, {parent}) => {
          const { minamount } = parent;
          return value > minamount;
        }),
        rewardamount: yup.number().required('Reward Amount is required').min(0, 'Amount must be non-negative'),
    }

    const tableViewFields = [
        { name : 'companyname', label: 'Vendor Name', type : 'text' },
        { name : 'pointtype', label: 'Point Type', type : 'number' },
        { name : 'rewardpoint', label: 'Reward Amount', type : 'number' },
        { name : 'isapproved', label: 'Status', type : 'label', canflagupdate : true },
    ]

    const pageRights = { pageName : 'Point Rules', formName : 'Point Rule', apiName : WebMethods.GetPageName(), addForm : false, isViewUpdateDelete : false, 'update' : false , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Point Rule </title>
      </Helmet>

      <PointTableController />
    </>
  );
}
