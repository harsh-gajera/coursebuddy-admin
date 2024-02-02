// src/redux.js
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Counter Slice
const storeSlice = createSlice({
  name: 'reduxstore',
  initialState: {
    data : [],
    modal : {},
    formData : {},
    formFields : [],
    formValidation : {},
    tableViewFields : [],
    pageRights : {},
    pageNo : 1,
    pageLimit : 10,
    nextPage : 0,
    searchText : '',
    sort : '',
    masterData : {},
    masterDataList : {},
    loginData : {},
    disabledbutton : { submit : false, delete : false, export : false },
  },
  reducers: {
    setData: (state,action) => {
        state.data = action.payload.data ? [...action.payload.data] : [...state.data]
        state.modal = action.payload.modal ? {...state.modal,...action.payload.modal} : {...state.modal}
        state.formData = action.payload.formData ? {...action.payload.formData} : {...state.formData}
        state.formFields = action.payload.formFields ? [...action.payload.formFields] : [...state.formFields]
        state.formValidation = action.payload.formValidation ? {...action.payload.formValidation} : {...state.formValidation}
        state.tableViewFields = action.payload.tableViewFields ? [...action.payload.tableViewFields] : [...state.tableViewFields]
        state.pageRights = action.payload.pageRights ? {...action.payload.pageRights} : {...state.pageRights}
        state.pageNo = action.payload.pageNo !== undefined ? action.payload.pageNo : state.pageNo
        state.pageLimit = action.payload.pageLimit !== undefined ? action.payload.pageLimit : state.pageLimit
        state.nextPage = action.payload.nextPage !== undefined ? action.payload.nextPage : state.nextPage
        state.searchText =  action.payload.searchText !== undefined ? action.payload.searchText : state.searchText
        state.sort = action.payload.sort ? {...action.payload.sort} : {...state.sort}
        state.masterData = action.payload.masterData ? {...state.masterData,...action.payload.masterData} : {...state.masterData}
        state.masterDataList = action.payload.masterDataList ? {...state.masterDataList,...action.payload.masterDataList} : {...state.masterDataList}
        state.loginData = action.payload.loginData ? {...action.payload.loginData} : {...state.loginData}
        state.disabledbutton = action.payload.disabledbutton ? {...state.disabledbutton,...action.payload.disabledbutton} : {...state.disabledbutton}
    },
    clearData: (state, action) => {
      state.data = []
      state.searchText = ''
      state.pageNo = 1
      state.pageLimit = 10
      state.nextPage = 0
    }
  },
});

// Export counter actions and reducer
export const { setData, clearData } = storeSlice.actions;
export const selectCount = (state) => state;
export const counterReducer = storeSlice.reducer;

// Redux Store
const store = configureStore({
  reducer: { store : counterReducer },
  devTools : import.meta.env.VITE_REACT_Mode === 'prod' ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
});

export default store;
