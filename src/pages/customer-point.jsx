import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function CustomerPointPage() {
  const dispatch = WebMethods.GetReduxDispatch();

  const tableViewFields = [
    { name: 'customer', label: 'Customer' },
    { name: 'companyname', label: 'Vendor Name' },
    { name: 'amounttype', label: 'Amount Type' },
    { name: 'points', label: 'Points' },
    { name: 'date', label: 'Date', type: 'date' },
  ];

  const pageRights = {
    pageName: 'Customer Points',
    formName: 'Customer Point',
    apiName: WebMethods.GetPageName(),
    formSize: 'sm',
    addForm: false,
    isViewUpdateDelete: false,
    update: true,
    delete: true,
  };

  dispatch(setData({ tableViewFields, pageRights }));

  return (
    <>
      <Helmet>
        <title> Customer Point </title>
      </Helmet>

      <MasterController />
    </>
  );
}
