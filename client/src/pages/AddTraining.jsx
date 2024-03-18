import React from 'react'
import Formrow from '../components/Formrow'
import {Form,redirect,useNavigation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'
import '../assets/styles/Home.css'
export const action=async ({request})=>{
  const formData=await request.formData();
  const data=Object.fromEntries(formData);
  try {
    await customFetch.post('/trainings',data);
    toast.success('added training successfully');
    return redirect('/dashboard/trainings');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  
  
}
function AddTraining() {

  return (
    <div className='add-training-box'>
        
        <Form method="post" className='forms-right' action="">
          
            <h4 className='form-title'>ADD TRAINING</h4>
            <Formrow type="text" name="name" labelText="NAME OF TRAINING" />
            <Formrow type="text" name="desc" labelText="DESCRIPTION"/>
            <Formrow type="text" name="originalPrice" labelText="ORIGINAL PRICE"/>
            <Formrow type="text" name="offerPrice" labelText="OFFER PRICE"/>
            <Formrow type="text" name="time" labelText="TIME OF PRICE IN MONTHS"/>
            <Formrow type="text" name="timePrice" labelText="TIME PRICE"/>
            <button className='submit-btn' type="submit">ADD</button>
        </Form>
    </div>
  )
}

export default AddTraining