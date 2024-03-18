import React from 'react'
import '../assets/styles/Navbar.css'
import { useDashboardContext } from './DashboardLayout';
import { Link,NavLink } from 'react-router-dom';
import { IoMenuSharp } from "react-icons/io5";
import {NavLinkData} from '../components/NavLinkData'
function Navbar({setNavbar,showSetNavbar}) {
    const data=useDashboardContext();
    function handleClick(e){
      e.preventDefault();
      showSetNavbar(!setNavbar);
    }
    
   
  return (
    <div className='navbar-home'>
        <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
        <div className="nav-links">
          
            <Link  className="nav-links-link" key="1" to="/dashboard">Home</Link>
            <Link  className="nav-links-link" key="2" to="/dashboard/profile">Profile</Link>
            {/* <Link  className="nav-links-link" key={item.key} to={item.path}>{item.title}</Link>
            <Link  className="nav-links-link" key={item.key} to={item.path}>{item.title}</Link> */}
            
          
          
          
          
          

        </div>
        <div className="menu-navbar" onClick={handleClick}>
            <IoMenuSharp  /> 
          </div>
    </div>
  )
}

export default Navbar