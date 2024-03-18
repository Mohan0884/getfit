import React from 'react'
import {Form,redirect,useNavigation} from 'react-router-dom'
import Formrow from '../components/Formrow'
import {Link} from 'react-router-dom'
import Logo from '../components/Logo'
import Img from '../assets/images/create-account.png'
import '../assets/styles/Form.css'
import customFetch from '../../../utils/customFetch.js'
import { toast } from 'react-toastify'

export const action=async ({request})=>{
  const formData=await request.formData();
  const data=Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register',data);
    toast.success('registered successfully');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

function Register() {
  const navigation =useNavigation();
  const isSubmitting=navigation.state==='submitting';
  return (
    <div className='form'>
      <div className="forms">
      <div className="forms-left">
        <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
          <img className='form-image' src={Img} alt="" />
      </div>
      <Form className="forms-right" method="post" action="">

      <h4 className='form-title'>CREATE YOUR ACCOUNT</h4>
        <Formrow type="text" name="name" labelText="FIRST NAME" />
        <Formrow type="text" name="lastName" labelText="LAST NAME"/>
        <Formrow type="email" name="email" labelText="EMAIL"/>
        <Formrow type="password" name="password" labelText="PASSWORD"/>
        <button type="submit" className='submit-btn' disabled={isSubmitting}>{isSubmitting?'SUBMITTING':'SIGNUP'}</button>
        <p className='link-end'>ALREADY HAVE AN ACCOUNT?<Link className='link-end-bold' to="/login">LOGIN</Link></p>
      </Form>
      </div>  
    </div>
  )
}

export default Register