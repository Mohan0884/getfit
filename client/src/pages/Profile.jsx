import React from 'react'
import '../assets/styles/Form.css'
import {Link,useNavigation,useOutletContext,Form} from 'react-router-dom'
import Img from '../assets/images/login.png'
import Formrow from '../components/Formrow'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async({request})=>{
  const formData=await request.formData();
  const file=formData.get('avatar');
  if(file && file.size>5000000){
    toast.error('image size is too large');
    return null;
  }
  try {
    await customFetch.patch('/users/update-user',formData);
    toast.success('Profile Updated Successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
}
function Profile() {
  const user=useOutletContext();
  const navigate=useNavigation();
  const img=user.avatar?user.avatar:Img;
  const isSubmitting=navigate.state==="submitting";
  const {name,lastName,email,age,gender,height,weight,bmi,chest}=user;
  return (
    <div className='form'>
    <div className="forms">
    <div className="forms-left">
      
      <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
        <h2 className='landing-logo-yellow'>PROFILE</h2>
        <img className='form-images' src={img} alt="" />
    </div>
    <Form method='post' className="forms-right" encType='multipart/form-data'>
      
    <h4 className='form-title'>PROFILE</h4>

          <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
      <Formrow type="text" name="name" labelText="FIRST NAME" labels="NAME" defaultValue={name} />
      <Formrow type="text" name="lastName" labelText="LAST NAME" labels="LASTNAME" defaultValue={lastName} />

      <div className="form-rows">
      <Formrow type="number" name="age" labelText="AGE" labels="AGE" defaultValue={age}/>
      <Formrow type="text" name="gender" labelText="GENDER" labels="GENDER" defaultValue={gender}/>
      </div>

      <Formrow type="email" name="email" labelText="EMAIL" labels="EMAIL" defaultValue={email}/>
      <div className="body-measures">
        <h4>BODY MEASUREMENTS</h4>
        <div className="form-rows">
      <Formrow type="number" name="weight" labelText="WEIGHT" labels="WEIGHT" defaultValue={weight}/>
      <Formrow type="number" name="height" labelText="HEIGHT" labels="HEIGHT" defaultValue={height}/>

      </div>
      <div className="form-rows">

      <Formrow type="number" name="bmi" labelText="BMI"labels="BMI" defaultValue={bmi}/>
      <Formrow type="number" name="chest" labelText="CHEST" labels="CHEST" defaultValue={chest}/>
      
      </div>
      </div>
      <button type="submit" disabled={isSubmitting} className='submit-btn'>{isSubmitting?'UPDATING':'UPDATE'}</button>
    </Form>
    </div>  
  </div>
  )
}

export default Profile