import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function OrderPage() {

    const dispatch = WebMethods.GetReduxDispatch()

    const tableViewFields = [
        { name: 'customer', label: 'Customer' },
        { name: 'companyname', label: 'Vendor' },
        { name: 'service', label: 'Service' },
        { name: 'purchase', label: 'Purchase' },
        { name: 'redeem', label: 'Redeem' },
        { name: 'rewardpoint', label: 'Reward Points' },
        { name: 'date', label: 'Date', type : 'date' },
    ]

    const pageRights = { pageName : 'Orders', formName : 'Order', apiName : WebMethods.GetPageName(), formSize : 'sm', addForm : false, isViewUpdateDelete : false, 'update' : true , 'delete' : true }

    dispatch(setData({ tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Customers Category </title>
      </Helmet>

      <MasterController />
    </>
  );
}
