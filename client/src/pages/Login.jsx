import React from 'react'
import Formrow from '../components/Formrow'
import {Link,Form,redirect,useNavigation,useNavigate} from 'react-router-dom'
import Img from '../assets/images/login.png'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'

export const action =async ({request})=>{
  const formData=await request.formData();
  const data= Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login',data);
    toast.success('login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

function Login() {
  const navigation=useNavigation();
  const isSubmitting=navigation.state==="submitting";
  const navigate=useNavigate();
  const loginDemoUser=async ()=>{
    const data={
      email:"test@test.com",
      password:"secret123"
    }
    try {
      await customFetch.post('/auth/login',data);
      toast.success('Take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      
    }
  }
  return (
    <div className='form'>
      <div className="forms">
        <div className="forms-left">
        <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
        <img className='form-image' src={Img} alt="" />
        </div>
      <Form className="forms-right" method='post' action="">
      <h4 className='form-title'>LOGIN</h4>
        <Formrow type="email" name="email" labelText="EMAIL"/>
        <Formrow type="password" name="password" labelText="PASSWORD"/>
        <button type="submit" className='submit-btn' disabled={isSubmitting}>{isSubmitting?'SUBMITTING':'SUBMIT'}</button>
        <button type="button" onClick={loginDemoUser} className='submit-btn' >Explore App</button>
        
        <p className='link-end'>DON'T HAVE AN ACCOUNT ?<Link className='link-end-bold' to="/register">SINGUP</Link></p>
      </Form>
      </div>
    </div>
  )
}

export default Login