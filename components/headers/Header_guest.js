
import Link from "next/link";

const Header_guest = ({headerguest_stat}) => {
    if(headerguest_stat==1)
    { return (
        <>
     
        <div className="top-header" >
        <Link href="/login">
        
            <a >
                
                Sign in
            </a>
        </Link>
            <Link href="/register">
              <a >
                Register
            </a>
            </Link>
          
        </div>
        </>
    )}
    else {
        return (
            <></>
        );
    }
}

export default Header_guest;