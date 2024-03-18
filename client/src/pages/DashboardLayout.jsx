import React,{useState,createContext, useContext} from 'react'
import { Outlet,redirect, useLoaderData ,useNavigate} from 'react-router-dom'
import Dashboard from './Dashboard'
import '../assets/styles/Sidebar.css'
import Navbar from './Navbar'
import NavMenu from '../components/NavMenu'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'

const DashboardContext=createContext();
export const loader=async ()=>{
  try {
    const {data}=await customFetch.get('/users/current-user');
    console.log(data.msg);
    return data.msg;
  } catch (error) {
    return redirect('/');
  }
}

function DashboardLayout() {
  const user=useLoaderData();
  const navigate=useNavigate();
const [isDarkTheme,setIsDarkTheme]=useState(false);
const [setNavbar,showSetNavbar]=useState(false);
const logoutUser=async ()=>{
  navigate('/');
  await customFetch.get('/auth/logout');
  toast.success('logout successful');
}


  return (
    <DashboardContext.Provider value={{user,logoutUser,setIsDarkTheme,isDarkTheme,setNavbar,showSetNavbar}}>
    <div className='dashboard'>
      <Dashboard />
      <div className='dash-nav'>
      <Navbar showSetNavbar={showSetNavbar} setNavbar={setNavbar} />
      <NavMenu setNavbar={setNavbar}/>
      <Outlet context={user}/>
      </div>
    </div>
    </DashboardContext.Provider>

  )

}
export const useDashboardContext=()=>useContext(DashboardContext);

export default DashboardLayout