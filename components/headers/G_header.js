
import Logo from '../Logo'
import Header_auth from './Header_auth'


const G_header = () => {


    function show_left_nav(){
        const h_btn = document.querySelector(".header .left_nav .mobile_hum");
        const l_nav = document.querySelector(".header .left_nav .p_nav");
        if(!h_btn.classList.contains('open')){
             h_btn.classList.add("open");

            l_nav.classList.add("open");
        }
        else {
            h_btn.classList.remove("open");

            l_nav.classList.remove("open");
        }
       
        
    }

    return (
        <>
            <div className="header" >
                
                <div className="left_nav" >
                    <div onClick={show_left_nav} className='mobile_hum'><i className="fas fa-bars"></i></div>
                    <div className="logo_holder" >
                        <Logo/>
                    </div>
                    <div className="p_nav" >
                        <ul>

                            <li>
                                <a href="#"><i className="fas fa-home"></i>Home</a>
                                
                            </li>
                            <li><a href="#"> <i className="fas fa-info-circle"></i> About us</a></li>
                            <li><a href="#"><i className="fas fa-address-book"></i>Contact us</a></li>

                        </ul>
                    </div>

                </div>
                <Header_auth/>

            </div>

        </>
    )
}

export default G_header;