
import Link from "next/link";
import   {auth} from '../../utils/auth';
import { useState, useEffect } from 'react';
const Header_auth = () => {
           const [user, setUser] = useState(null);

        useEffect(() => {
        const subscription = auth.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        auth.logout();
    }
    function show_drop(){
        const user_header = document.querySelector(".header .right");
        const drop_header = document.querySelector(".header .drop_mnu");
        if(!user_header.classList.contains('open')){
             user_header.classList.add("open");

            drop_header.classList.add("open");
        }
        else {
            user_header.classList.remove("open");

            drop_header.classList.remove("open");
        }
       
        
    }
           if (!user) return (
            <>
               <div className="right" >
                    <span className="curr">Ar</span>
                    
                </div>
                </>
        );
  
    else {
        return (
            <>
                <div className="right" onClick={show_drop} >
                    <span className="curr">{user.first_name.charAt(0).toUpperCase()}{user.last_name.charAt(0).toUpperCase()}</span>
                    <span className="name" >Hello {user.first_name} !</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="drop_mnu">
                    <ul>
                        <li>
                                <a href="" onClick={logout} > <i className="fas fa-sign-out-alt"></i> Logout</a>
                        </li>
                    </ul>
                </div>
               
            </>
        );
    }
}

export default Header_auth;