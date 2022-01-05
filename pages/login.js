
import { useRouter } from "next/router";
import TabNavigation from '../components/guest'
import Main from '../container/main'
import Notify from '../components/Notify';




import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import  {auth} from '../utils/auth';
import  {warning} from '../utils/warning';



const LoginTab = () => {
    const router = useRouter();
  
        const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };


    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        return auth.login(email, password)
            .then(() => {
              
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(warning.error);
    }
  return (

    <Main headerguest_stat="1">
        <TabNavigation/>
        <span  className="dis mobile" >Already have an account, then welcome back.</span>
        <Notify/>
        
          <div className="login" >
 
        <form  onSubmit={handleSubmit(onSubmit)}>

          <div className={` inp_d ${errors.email? "validate" :""}`}>
                  <input  type="email" {...register('email')}  name="email" id="" placeholder="Email*" />
               
            <div className="feedback">{errors.email?.message}</div>
          </div>


        
        <div className={` inp_d ${errors.password? "validate" :""}`}>
            <input   type="password"   {...register('password')}  name="password"  placeholder="Password*" />
            <div className="feedback">{errors.password?.message}</div>
        </div>

       
         <div>
             <button className="btn_sub" type="submit">Submit</button>
         </div>
         </form>
   </div>

    </Main>

    



      
 
  );
};

export default LoginTab;
