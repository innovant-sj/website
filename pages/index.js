import Logo from '../components/Logo'

import Main from '../container/main'
const Home = () => {
  return (
    <Main>
    <div className="home" >
    
        <div className="logo_holder" > 
                    <Logo/>
        </div>
        <span className="txt"  >The Logo Above is Made in Pure CSS</span>
    </div>
    </Main>
  );
};

export default Home;
