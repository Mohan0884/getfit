import React from 'react'
import {Link,Form, Outlet, redirect, useLoaderData} from 'react-router-dom'
import customFetch from '../../../utils/customFetch'
import '../assets/styles/Training.css'
import { CiSquarePlus } from "react-icons/ci";
import { useDashboardContext } from './DashboardLayout'
export const loader=async()=>{
  try {
    const items=await customFetch.get('/trainings');
    return items;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/trainings/add-training');
  }
}
function Trainings() {
  const {data}=useLoaderData();
  const {trainings}=data;
  console.log(trainings);
  const {user}=useDashboardContext();
  return (
    <div className='main-trainings'>
      <Outlet/>
      <div className="trainings-home">
      {
        trainings.map((item)=>{
          return (
            <div key={item._id} className="training-item" >
            <div key={item._id}  className="training-names">{item.name}</div>
            <br />
            <hr />
            <br />
            <div className="training-prices">
              <div className="training-original-prices">
                {item.originalPrice}
              </div>
              <div className="training-offer-prices">
                {item.offerPrice}/- per month
              </div>
            </div>
            
            {user.role==='admin'&& 
            <div className='admin-buttons'>
            <Link to={`/dashboard/trainings/update-training/${item._id}`} className='admin-button-edit'>edit </Link>
            <Form  method='post' action={`/dashboard/trainings/delete-training/${item._id}`}>
            
              
            <button  type='submit' className='admin-button-delete-delete' >
            Delete
            </button>
            </Form>
            
            
            </div>
            
            }
            <Link key={item._id}  className='admin-button-delete' to={`/dashboard/trainings/${item._id}`} >Know More</Link>
            </div>

          )
          
        })
        
      }
      {user.role==='admin' &&
      <Link className='add-training-trainings' to="/dashboard/trainings/add-training"><CiSquarePlus/></Link>

      }
      </div>
      

    </div>
  )
}

export default Trainings