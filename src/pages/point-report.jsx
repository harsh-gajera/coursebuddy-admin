import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';

export default function PointReportPage() {
  const dispatch = WebMethods.GetReduxDispatch();

  const tableViewFields = [
    { name: 'companyname', label: 'Vendor Name' },
    { name: 'givenpoint', label: 'Given Points', notsortable: true },
    { name: 'gettingpoint', label: 'Getting Points', notsortable: true },
    { name: 'offset', label: 'Offset', notsortable: true },
  ];

  const pageRights = {
    pageName: 'Point Reports',
    formName: 'Point Report',
    apiName: WebMethods.GetPageName(),
    formSize: 'sm',
    addForm: false,
    isViewUpdateDelete: false,
    update: true,
    delete: true,
    exportCSV: true,
  };

  dispatch(setData({ tableViewFields, pageRights }));

  return (
    <>
      <Helmet>
        <title> Point Report </title>
      </Helmet>

      <MasterController />
    </>
  );
}
