import { Helmet } from 'react-helmet-async';
import { WebMethods } from 'src/config/Method';
import MasterController from 'src/controllers/master-controller';
import { setData } from 'src/redux/store';
import * as yup from 'yup';

export default function BannerPage() {

    const dispatch = WebMethods.GetReduxDispatch()

    // form field
    const formFields = [
      { name: 'title', label: 'Title', type : 'text', gridSize : 12 },
      { name: 'description', label: 'Description', type : 'textarea', gridSize : 12 },
      { name: 'image', label: 'Image', type : 'file', gridSize : 12 },
    ];

    const formValidation = {
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      image: yup.string().required('Image is required'),
    }

    const tableViewFields = [
      { name : 'companyname', label: 'Vendor Name', type : 'text' },
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description' },
      { name: 'image', label: 'Image', type : 'file' },
      { name : 'isapproved', label: 'Status', type : 'label', canflagupdate : true },
    ]

    const pageRights = { pageName : 'Banners', formName : 'Banner', apiName : WebMethods.GetPageName(), formSize : 'sm', addForm : true, isViewUpdateDelete : false, 'update' : true , 'delete' : true }

    dispatch(setData({ formFields, formValidation, tableViewFields, pageRights }))

  return (
    <>
      <Helmet>
        <title> Banner </title>
      </Helmet>

      <MasterController />
    </>
  );
}
