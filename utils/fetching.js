
import   {auth} from './auth';
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,

};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
 
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    
    return fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' ,  ...authHeader(url) },
        body: JSON.stringify(body)

    }).then(handleResponse);

}





function authHeader(url) {
    
    const user = auth.userValue;
    const isLoggedIn = user && user.accessToken;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    
    if (isLoggedIn && isApiUrl) {
        return { "x-access-token": `${user.accessToken}` };
    } 

        return {};

}

function handleResponse(response) {

    return response.text().then(text => {
 
        const data = text && JSON.parse(text); 
           
        if (!response.ok) {
            if(data == 1 || data ==0){
                return  data;
            }
 
            if ([401, 403].includes(response.status) && auth.userValue) {
                 
                auth.logout();
                  

            }
             if ([401, 403].includes(response.status) && !auth.userValue) {
                 
             
                const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);  
            }
    
          
        }
       

        return data;
    });
}