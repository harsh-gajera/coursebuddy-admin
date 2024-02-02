import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import serverURL from "./Config";

export const WebMethods = {
    GetReduxStore (){
       const reduxStore = useSelector(store => store.store)
       return reduxStore
    },
    GetReduxDispatch (){
       return useDispatch()
    },
    SetLocalStorage (key, data) {
        return localStorage.setItem(key, data)
    },
    GetLocalStorage (key) {
        return localStorage.getItem(key)
    },
    RemoveLocalStorage (key) {
        return localStorage.removeItem(key)
    },
    ConvertJsonString(data) {
        return JSON.stringify(data)
    },
    ConvertJsonParse(data) {
        return JSON.parse(data)
    },
    SetSessionStorage(key, value, expirationMinutes) {
        const now = new Date();
        const expirationTime = now.getTime() + expirationMinutes * 60 * 1000;
        const dataWithExpiration = { value, expirationTime };
        sessionStorage.setItem(key, JSON.stringify(dataWithExpiration));
    },
    GetSessionStorage(key){
        const dataString = sessionStorage.getItem(key);
        if (dataString) {
          const { value, expirationTime } = JSON.parse(dataString);
          const now = new Date();
      
          if (now.getTime() < expirationTime) {
            return value;
          }
          // Data has expired, clear it from sessionStorage
          sessionStorage.removeItem(key);
        }
        return null;
    },
    RemoveSessionStorage(key) {
        sessionStorage.removeItem(key);
    },
    GetLoginInfo(){
        // let logindata = this.GetLocalStorage('logindata')
        // return this.ConvertJsonParse(logindata)
        let logindata = this.GetSessionStorage('logindata')
        return logindata
    },
    GetPageName(){
        const location = useLocation()
        const currentPageName = location.pathname.split('/').pop();
        return currentPageName
    },
    async GetListRequest (url,payload) {
        const headers = {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${this.GetLocalStorage('token')}`,
            Authorization: `Bearer ${this.GetSessionStorage('token')}`,
          };

        try {
            const response = await axios.post(url, payload,{ headers });
            return response.data
        } catch (error) {
            // console.log(error.response.data)
            if(error.response.data.status === 401 && error.response.data.istokenerr){
                // this.RemoveLocalStorage('token')
                this.RemoveSessionStorage('token')
            }
            return error.response.data
        }
    },
    async InsertRequest (url,payload,hasFile = false) {
        const headers = {
            // 'Content-Type': 'application/json',
            // Authorization: `Bearer ${this.GetLocalStorage('token')}`,
            Authorization: `Bearer ${this.GetSessionStorage('token')}`,
            'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
          };

        try {
            const response = await axios.post(url, payload,{ headers });
            return response.data
        } catch (error) {
            if(error.response.data.status === 401 && error.response.data.istokenerr){
                // this.RemoveLocalStorage('token')
                this.RemoveSessionStorage('token')
            }
            return error.response.data
        }
    },
    async UpdateRequest (url,payload,hasFile = false) {
        const headers = {
            'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
            // Authorization: `Bearer ${this.GetLocalStorage('token')}`,
            Authorization: `Bearer ${this.GetSessionStorage('token')}`,
          };

        try {
            const response = await axios.put(url, payload,{ headers });
            return response.data
        } catch (error) {
            if(error.response.data.status === 401 && error.response.data.istokenerr){
                // this.RemoveLocalStorage('token')
                this.RemoveSessionStorage('token')
            }
            return error.response.data
        }
    },
    async DeleteRequest (url,payload) {
        const headers = {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${this.GetLocalStorage('token')}`,
            Authorization: `Bearer ${this.GetSessionStorage('token')}`,
        };

        try {
            const response = await axios.delete(url, { headers, data : payload });
            return response.data
        } catch (error) {
            console.log(error.response.data);
            if(error.response.data.status === 401 && error.response.data.istokenerr){
                // this.RemoveLocalStorage('token')
                this.RemoveSessionStorage('token')
            }
            return error.response.data
        }
    },
    Notification (msg, status) {
        if(status === 200){
            toast.success(msg)
        }else if(status){
            toast.warn(msg)
        }else{
            toast.error(msg)
        }
    },
    getImageUrl (url) {
        let imgUrl = `${serverURL.replace('/api', '')}uploads/${url}`
        return imgUrl
    },
    getDropDownData (data, field) {
        let dropdown_data = []
        if(data.length){
            data.forEach( obj => {
                console.log(obj,field);
                dropdown_data.push({ value : obj._id, label : obj[field]})
            })
        }
        return dropdown_data
    },
    getObjectFromArray(arr, key, value) {
        return arr.find( o => o[key] === value)
    },
    getIndexFromArray(arr, key, value) {
        return arr.findIndex( o => o[key] === value)
    },
    getTimeFormat(inputDateTime) {
        const inputDate = new Date(inputDateTime);
        
        // Get hours and minutes
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
      
        // Format hours in 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      
        // Determine if it's AM or PM
        const period = hours < 12 ? 'AM' : 'PM';
      
        // Pad minutes with leading zero if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        // Construct the formatted time string
        const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
      
        return formattedTime;
    },
    getDateFormat(date) {
        const inputDate = new Date(date);
      
        const year = inputDate.getFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDate.getDate().toString().padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }
} 
