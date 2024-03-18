import React from 'react'
import customFetch from '../../../utils/customFetch'
import { Form,redirect ,useLoaderData,useNavigation} from 'react-router-dom';
import Formrow from '../components/Formrow';
import { toast } from 'react-toastify';
import '../assets/styles/Form.css'
export const loader=async ({params})=>{
    try {
        const {data}=await customFetch.get(`/trainings/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect('/dashboard/trainings');
    }
}
export const action =async({request,params})=>{
    const formData=await request.formData();
    const data= Object.fromEntries(formData);
    try {
        await customFetch.patch(`/trainings/${params.id}`,data);
        toast.success('Training Updated Successfully');
        return redirect('/dashboard/trainings');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    } 
}
function EditTraining() {
    const {training}=useLoaderData();
    const navigate=useNavigation();

    const isSubmitting=navigate.state==="submitting"; 
    console.log(training);
  return (
    <div className="form">
<div className='forms'>
        <Form method="post" className='forms-right' action="">
            <h4 className='form-title'>Update Training</h4>
            <Formrow type="text" className='form-input' name="name" defaultValue={training.name} />
            <Formrow type="text" className='form-input' name="desc" defaultValue={training.desc} />
            <Formrow type="text" className='form-input' name="originalPrice" defaultValue={training.originalPrice} />
            <Formrow type="text" className='form-input' name="offerPrice" defaultValue={training.offerPrice} />
            <Formrow type="text"  className='form-input' name="time" defaultValue={training.time} />
            <Formrow type="text" className='form-input' name="timePrice" defaultValue={training.timePrice} />
            <button type="submit" className='submit-btn' disabled={isSubmitting}>{isSubmitting?'Updating...':'Update'}</button>
        </Form>
    </div>
    </div>
  )
}

export default EditTraining