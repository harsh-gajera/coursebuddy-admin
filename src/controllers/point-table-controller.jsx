import { useEffect } from "react";
import label from "src/components/label";
import serverURL from "src/config/Config";
import { WebMethods } from "src/config/Method";
import { clearData, setData } from "src/redux/store";
import MasterView from "src/view/master-view";
import PointTableView from "src/view/point-table-view";
import { useLocation } from 'react-router-dom';

export default function PointTableController () {

    const reduxStore = WebMethods.GetReduxStore()
    const dispatch = WebMethods.GetReduxDispatch()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const _id = searchParams.get('_id');

     // get data
    const fetchData = async (pageno, sortdata, pagelimit, filter = {}) => {
        const payload = {
            paginationinfo : {
                pageno : pageno || reduxStore.pageNo,
                pagelimit : pagelimit || reduxStore.pageLimit
            },
            searchtext : reduxStore.searchText,
            sort : sortdata || reduxStore.sort,
            filter
        }
        const response = await WebMethods.GetListRequest(`${serverURL}${reduxStore.pageRights.apiName}`, payload)
        
        if(response.status === 200){
            if((pageno || reduxStore.pageNo) > 1){
                dispatch(setData({data : reduxStore.data.concat(response.data), nextPage : response.nextpage}))
            }else{
                dispatch(setData({data : response.data, nextPage : response.nextpage}))
            }
        }
    }

    const getMasterData = async (field) => {
        const response = await WebMethods.GetListRequest(`${serverURL}${field.masterdataapi}`, {})
        if(response.status === 200){
            dispatch(setData({masterDataList : { [field.masterdata] : response.data} }))
            dispatch(setData({masterData : { [field.masterdata] : WebMethods.getDropDownData(response.data, field.dropdownlabelfield)} }))
        }
    }

    useEffect(()=>{
        let filter =  _id?.length ? { vendorid : _id } : {}

        dispatch(clearData())
        fetchData(undefined, undefined, undefined, filter)
    },[])

    const handleModal = async (key, value) => {
        await dispatch(setData({modal : {[key]: value}}))
      }

    const handleOpenForm = () => {
        handleModal('form',true)
        reduxStore.formFields.forEach( field => {
            if(field.masterdataapi){
                getMasterData(field)
            }else if(field.staticdropdowndata){
                dispatch(setData({masterData : { [field.masterdata] : field.staticdropdowndata } }))
            }
        })
        
        const tempFormData = {}
        reduxStore.formFields.filter( o => o.type !== 'subtitle').forEach( field => {
            if(field.type === 'file'){
                // tempFormData[field.name] = {}
                tempFormData[field.name] = ''
            }else{
                tempFormData[field.name] = ''
            }
        })
        dispatch(setData({formData : tempFormData }))
    }

    

    // handle update modal
    const handleUpdateModal = async (data) => {
        reduxStore.formFields.forEach( field => {
            if(field.masterdataapi){
                getMasterData(field)
            }else if(field.staticdropdowndata){
                dispatch(setData({masterData : { [field.masterdata] : field.staticdropdowndata } }))
            }
        })

        await dispatch(setData({formData : data}))
        await handleModal('update',true)
    }

    // handle delete modal
    const handleDeleteModal = (data) => {
        handleModal('delete',true)
        dispatch(setData({formData : data}))
    }

    const handleCloseForm = () => {
        handleModal('form',false)
        handleModal('update',false)
        handleModal('delete',false)
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const fileRes = await WebMethods.InsertRequest(`${serverURL}upload`, formData, true);
        return fileRes.data;
    };


    const handleSubmitForm = async (form) => {
        
        const asyncTasks = reduxStore.formFields.map(async (obj) => {
            if (obj.type === 'file') {
                if(!(typeof form[obj.name] === 'string')){
                    const imagedetail = await uploadFile(form[obj.name]);
                    form[obj.name] = imagedetail.filename;
                    // form[`${obj.name}detail`] = imagedetail;
                }
            } else if (obj.type === 'dropdown') {
                if(obj.name.includes("id")){
                    const resultString = obj.name.replace("id", "");
                    form[resultString] = WebMethods.getObjectFromArray(reduxStore.masterData[obj.masterdata], 'value', form[obj.name]).label;
                }
            }
        });
        
        // Wait for all async tasks to complete
        await Promise.all(asyncTasks);
    
        const response = await WebMethods.InsertRequest(`${serverURL}${reduxStore.pageRights.apiName}/add`, form);
    
        if(response.status === 200){
          WebMethods.Notification(response.message, response.status)
          handleCloseForm()
          fetchData()
        }else{
          WebMethods.Notification(response.message)
        }
    };


    // Update data
    const handleUpdateForm = async (form) => {
        const asyncTasks = reduxStore.formFields.map(async (obj) => {
            if (obj.type === 'file') {
                if(!(typeof form[obj.name] === 'string')){
                    const imagedetail = await uploadFile(form[obj.name]);
                    form[obj.name] = imagedetail.filename;
                    form[`${obj.name}detail`] = imagedetail;
                }
            } else if (obj.type === 'dropdown') {
                if(obj.name.includes("id")){
                    const resultString = obj.name.replace("id", "");
                    const value = WebMethods.getObjectFromArray(reduxStore.masterData[obj.masterdata], 'value', form[obj.name]).label
                    form = {...form, [resultString] : value }
                }
            }
        });
          
        await Promise.all(asyncTasks);
          
        const response = await WebMethods.UpdateRequest(`${serverURL}${reduxStore.pageRights.apiName}/update`, form);        

        if(response.status === 200){
            await handleCloseForm()
            WebMethods.Notification(response.message, response.status)
            await fetchData()
        }else{
            WebMethods.Notification(response.message)
        }
    }

    // Delete data
    const handleDeleteForm = async () => {
        const response = await WebMethods.DeleteRequest(`${serverURL}${reduxStore.pageRights.apiName}/delete`, reduxStore.formData);
        if(response.status === 200){
            WebMethods.Notification(response.message, response.status)
            handleCloseForm()
            fetchData()
        }else{
            WebMethods.Notification(response.message)
        }
    }

    const handleScroll = async (e) => {
        const { clientHeight, scrollHeight, scrollTop } = e.target;

        const reachedBottom = scrollTop + clientHeight + 0.5 >= scrollHeight;
        const dataLimit = reduxStore.pageLimit * reduxStore.pageNo == reduxStore.data.length

        if(reachedBottom && dataLimit){
            const updatedPageNo = reduxStore.pageNo + 1;
            await dispatch(setData({pageNo : updatedPageNo }))
            await fetchData(updatedPageNo)
        }
    };

    const handleSearch = (e) => {
        // if(e.key === 'Enter' && reduxStore.searchText.length){
        //     fetchData()
        // }
        if(e.key === 'Enter'){
            dispatch(setData({pageNo : 1 }))
            fetchData(1)
        }
    }

    const handleTableSort = (field) => {
        if(Object.prototype.hasOwnProperty.call(reduxStore.sort, field)){
            const sortData = { [field] : reduxStore.sort[field] > 0 ? -1 : 1}
            dispatch(setData({sort : sortData }))
            fetchData(1, sortData)
        }else{
            const sortData = { [field] : 1}
            dispatch(setData({sort : sortData }))
            fetchData(1, sortData)
        }
    }

    const handlePageLimit = (e) => {
        dispatch(setData({pageLimit : e.target.value }))
        // if(reduxStore.data.length == reduxStore.pageLimit){
        //     fetchData(1, {}, e.target.value)
        // }
        fetchData(1, {}, e.target.value)
    }


    return <PointTableView 
            handleOpenForm={handleOpenForm}
            handleCloseForm={handleCloseForm}
            handleSubmitForm={handleSubmitForm}
            handleUpdateForm={handleUpdateForm}
            handleDeleteForm={handleDeleteForm}
            handleUpdateModal={handleUpdateModal}
            handleDeleteModal={handleDeleteModal}
            handleScroll={handleScroll}
            handleSearch={handleSearch}
            handleTableSort={handleTableSort}
            handlePageLimit={handlePageLimit}
        />
}