import React from 'react'
import { useDashboardContext } from './DashboardLayout';
import { useOutletContext } from 'react-router-dom';
import LogoutContainer from './LogoutContainer';
import AddTraining from './AddTraining';
import '../assets/styles/Home.css'

function Home() {
  const user=useOutletContext();
  console.log(user);
  return (
    <div className='home-total'>
      <LogoutContainer/> 
      <div className="first-home">
        {user.plan!=='none'?<div>You are subscribed to {user.plan} subscription</div>:<div>No subscriptions .please subscribe to know the details</div>}
      </div>
    </div>
  )
}

export default Home