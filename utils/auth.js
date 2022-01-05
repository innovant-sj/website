import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';
import getConfig from 'next/config';
import  {fetchWrapper} from './fetching';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
export const auth = {
    
    user: userSubject.asObservable(),
    
    get userValue () { return JSON.parse(localStorage.getItem('user'))},
    
    login,
    logout,
    check_auth,
    register,
   
};

function login(email, password) {

    return fetchWrapper.post(`${baseUrl}/login/`, { email, password })
        .then(user => {
 
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
  
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function check_auth() {

    return fetchWrapper.get(`${baseUrl}/check/user/` ,{}).then(res => {
  
        const data = res && JSON.parse(res); 

            if (!data) {
                localStorage.removeItem('user');
                userSubject.next(null);
                data =0 ;
            }
            return data;
        });
}

function register(user) {
  
    
    return fetchWrapper.post(`${baseUrl}/register/`, user);
}

