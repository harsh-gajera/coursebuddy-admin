let serverURL
if(import.meta.env.VITE_REACT_Mode == 'prod'){
    serverURL = import.meta.env.VITE_API_BASE_URL
}else{ // dev
    serverURL = 'http://localhost:8000/api/'
}

export default serverURL