import '../styles/globals.css'
import '../styles/mobile.css'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import   {auth} from '../utils/auth';
export default MyApp




function MyApp({ Component, pageProps }) {
     const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        
        authCheck(router.asPath);

      
        const hideContent = () => setAuthorized(false);
             router.events.off('routeChangeStart', hideContent);
             router.events.off('routeChangeComplete', authCheck);
        return () => {
           router.events.off('routeChangeStart', hideContent);
             router.events.off('routeChangeComplete', authCheck);
       }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
       
  
  
        setUser(auth.userValue);
        const publicPaths = ['/login', '/register'];
   

        const path = url.split('?')[0];
     
        auth.check_auth().then(v => {
             
          
    
            if (!v && !publicPaths.includes(path)) {
           
                setAuthorized(false);
                router.push({
                    pathname: '/login',
            
                });
            }else if (v && publicPaths.includes(path)) {
               

                setAuthorized(true);
                router.push({
                    pathname: '/',
            
                });
            } 
            else {
                setAuthorized(true);
            }
        });;
    
      
    }


    return (
       <Component {...pageProps} />
    );
}
