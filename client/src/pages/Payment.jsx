import React from 'react'
import customFetch from '../utils/customFetch'
import { useDashboardContext } from './DashboardLayout'
import { useLoaderData,redirect } from 'react-router-dom'
import '../assets/styles/TrainingComponent.css'
import { toast } from 'react-toastify'
function handleToast(){
    toast.success('payment successful,go to trainings to view your subscription ')
}
export const loader=async({params})=>{
    const id=params.id;
    try {
        const training=await customFetch.get(`/trainings/${id}`);
        return training;
    } catch (error) {
        return error;
    }
}

function Payment() {

    const getUser=useDashboardContext();
    const user=getUser.user;
    const {data}=useLoaderData();
    const training=data.training;
    const  paymentHandler=async(e)=>{
        const date={
            amount:parseInt(training.offerPrice)*100,
            currency:"INR"
        }
        const response=await customFetch.post('/order',date);
       const {data}=response;
        const order=data;
        var options = {
            "key": "rzp_test_SOYe3DKZsVfZgs", // Enter the Key ID generated from the Dashboard
            amount:date.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency:"INR",
            "name": "Get Fit", //your business name
            "description": "Test Transaction",
            "image": "https://cdn.dribbble.com/users/4594187/screenshots/11433751/media/c10f47fa84c296ffdf3532f529b33c95.jpg",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler":async function (response){
                const body={
                    ...response,
                };
                const validateResponse=await customFetch.post(`/order/validate/${training.name}`,body);
                console.log({msg:'success'});
                alert('payment success go to trainings to view your subscription');
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": user.name, //your customer's name
                "email": user.email, 
                "contact": "9885310082"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Getfit Hyderabad Locality"
            },
            "theme": {
                "color": "#FFC700"
            },
            
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
                toast.error('payment failed due to some reasons please try again later');
        });
       
        
        rzp1.open();
        e.preventDefault();
    }
  return (
    <div className='confirm-pay'>
        You choosed  {training.name} subscription confirm to 
        <button className='pay-button' onClick={paymentHandler}>pay</button>
    </div>
  )
}

export default Payment