import axios from 'axios';
export default function Api(){
    const user = localStorage.getItem('userName');
    if(user){
        const  ApiClient = axios.create({
            baseURL: 'http://127.0.0.1:8000',
            withCredentials: true,
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('auth_token')}
        });
        return ApiClient;
     
       
    }
    else{
        const  ApiClient = axios.create({
            baseURL: 'http://127.0.0.1:8000',
            withCredentials: true,
        });
        return ApiClient;
       
    }
    
}
