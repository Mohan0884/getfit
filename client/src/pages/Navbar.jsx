import React from 'react'
import '../assets/styles/Navbar.css'
import { useDashboardContext } from './DashboardLayout';
import { Link,NavLink } from 'react-router-dom';
import { IoMenuSharp } from "react-icons/io5";
import {NavLinkData} from '../components/NavLinkData'
function Navbar({setNavbar,showSetNavbar}) {
    const data=useDashboardContext();
    function handleClick(){
      showSetNavbar(!setNavbar);
    }
   
  return (
    <div className='navbar-home'>
        <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
        <div className="nav-links">
          {NavLinkData.map((item)=>{
            return (
              <NavLink className="nav-links-link"  key={item.key} to={item.path}>{item.title}</NavLink>
            )
          })}
          
          
          
          

        </div>
        <div className="menu-navbar" onClick={handleClick}>
            <IoMenuSharp  /> 
          </div>
    </div>
  )
}

export default Navbar