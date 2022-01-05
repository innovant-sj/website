
import { useRouter } from "next/router";
import TabNavigation from '../components/guest'
import Main from '../container/main'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import  {auth} from '../utils/auth';
import  {warning} from '../utils/warning';
import Notify from '../components/Notify';

const RegisterTab = () => {

  const router = useRouter();
   
    const validationSchema = Yup.object().shape({
      
        firstname: Yup.string()
            .required('First Name is required'),
        lastname: Yup.string()
            .required('Last Name is required'),
        email: Yup.string().email()
            .required('Email is required'),
        password: Yup.string()
            .required('Email is required') 
            .min(8, 'Password is too short - should be 8 chars minimum.'),
            
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit,  formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        
      createUser(data)
    
    }

    function createUser(data) {
    
        return auth.register(data)
            .then(() => {

                warning.success('User added', { keepAfterRouteChange: true });
                router.push('/login');
            })
            .catch(warning.error);
    }

  return (

    <Main headerguest_stat="1">
        <TabNavigation/>
           <span  className="dis mobile" >Browse and find what you need.</span>
        <Notify />
       
    <div className="register">
      <form  onSubmit={handleSubmit(onSubmit)}>

    

        <div className="spl"  >

          <div className={` inp_d ${errors.firstname? "validate" :""}`}>
                 
                 <input   {...register('firstname')}  type="text" name="firstname"  placeholder="First Name*" />
            <div className="feedback">{errors.firstname?.message}</div>
          </div>

          <div className={` inp_d ${errors.lastname? "validate" :""}`}>
                 
                    <input   type="text"  {...register('lastname')} name="lastname"  placeholder="Last Name*" />
               <div className="feedback">{errors.lastname?.message}</div>
          </div>
         
        
        

        </div>


        <div className={` inp_d ${errors.email? "validate" :""}`}>
                 
                 <input  type="email"  {...register('email')}  name="email"  placeholder="Email*" />
                      <div className="feedback">{errors.email?.message}</div>
        </div>
    
      
        <div className={` inp_d ${errors.password? "validate" :""}`}>
            <input  type="password"   {...register('password')}  name="password"  placeholder="Password*" />
            <div className="feedback">{errors.password?.message}</div>
        </div>

        

        <div className={` inp_d ${errors.passwordConfirmation? "validate" :""}`}>         
            <input  type="password"  {...register('passwordConfirmation')}  name="passwordConfirmation"  placeholder="Repeat Password*" />
            <div className="feedback">{errors.passwordConfirmation?.message}</div>           
        </div>

      
          

    
        <div>
            <button className="btn_sub" type="submit">Submit</button>
        </div>
      </form>
    </div>

    </Main>

    



      
 
  );
};

export default RegisterTab;
