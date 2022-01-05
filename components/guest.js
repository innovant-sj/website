import Link from "next/link";
import { useRouter } from "next/router";


const Tab = ({  href, className , title , desc , icon }) => {
  const router = useRouter();
  return (
   
    <Link href={href} scroll={false}>
      

        <a   className={`item ${className}
          ${router.pathname === href ? "current" :""}
        `} >
          {
          router.pathname === href ? 
          
          
             <div className={`index_t ${className}`}>
                <i className="  fas fa-check"></i>
            </div>
            : "" }

          
           
                <i className={`fas ${icon}`}></i>
                <span className="tit" >{title}</span>
                <span className="dis" >{desc}</span>
        </a>
    </Link>
  );
};

const TabNavigation = ({ children }) => {
    const router = useRouter();
  return (

    
   

        <div className="nav_l_r" >
       

        <Tab href="/register" className="register_card" title="Register" desc="Browse and find what you need." icon="fa-user-plus" >
         
        </Tab>

        <Tab href="/login" className="sign_in" title="Sign in" desc="Already have an account, then welcome back." icon="fa-sign-in-alt" >
        
        </Tab>

          
          
        </div>



    





  );
};

export default TabNavigation;
