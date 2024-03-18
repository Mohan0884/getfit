import React,{useState} from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import '../assets/styles/logout.css'
function LogoutContainer() {
    const [showLogout,setShowLogout]=useState(false);
    const {user,logoutUser}=useDashboardContext();
  return (
    <div className='logout'>
        <div className='welcome-back' >
            Welcome back {user.name}
        </div>
            <button className='logout-btn' onClick={logoutUser}>Logout</button>
        
    </div>
  )
}

export default LogoutContainer