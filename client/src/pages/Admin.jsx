import React from 'react'
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { useDashboardContext } from './DashboardLayout';
import { toast } from 'react-toastify';
import '../assets/styles/Admin.css'
export const loader= async()=>{
  try {
    const items=await customFetch.get('/getAdmin');
    return items;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/admin');
  }
}
function Admin() {
  const {data}=useLoaderData();
  let a=0;
  const users=data.usersSubscribed;
  const dashboard=useDashboardContext();
  const {user}=dashboard;
  console.log(user);
  const date=Date(user.createdAt);
  if(user.role==="user"){
    toast.error('only admin can use this route');
    return (
      <div>only admin can access</div>
    )
  }
  
  return (
    <div className='tables'>
    <table cellSpacing="2">
      <tr>
        <th>Name</th>
        <th>Training</th>
        <th>Training Start Data</th>

        <th>Paid</th>
      </tr>
     {
        users.map((user)=>{
          {a+=parseInt(user.price)}
          return (
            <tr>
              <td>{user.username}</td>
              <td>{user.trainingChoosed}</td>
              <td>{user.createdAt}</td>
              <td>{user.price}</td>
              
            </tr>
          )
        })
      }
      <tr>
        <td></td>
        <td></td>
        <td>Total</td>
        <td>{a}</td>
      </tr>
    </table>
    </div>
  )
}

export default Admin