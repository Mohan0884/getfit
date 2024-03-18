import React from 'react'
import {Link,useLoaderData,redirect,useNavigation} from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch';
import '../assets/styles/TrainingComponent.css'

export const loader=async({params})=>{
  const id=params.id;
  try {
   const data= await customFetch.get(`/trainings/${id}`)
   return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}
function TrainingComponent() {
  const {data}=useLoaderData();
  const {training}=data;
  console.log(training);
  return (
    <div className='each-training'>
      <div className="training-card">

      <p className='training-name'> {training.name}</p>
      <hr />  
      <br />
      <p className='training-desc'>{training.desc}</p>
      <p className='training-price'><span className='training-original-price'>{training.originalPrice}/- </span>{training.offerPrice}/- per month</p>
      <div className="pay-button-div">
        <Link className='pay-button' to={`/dashboard/trainings/order/${training._id}`}>pay</Link>
      </div>
      </div>
    </div>
  )
}

export default TrainingComponent