import React, { useState } from 'react'
import { NavLinkData } from './NavLinkData'
import { Link } from 'react-router-dom'
import '../assets/styles/Navbar.css'
import { useDashboardContext } from '../pages/DashboardLayout';
function NavMenu({setNavbar,showSetNavbar}) {

    function handleFalse(){
        showSetNavbar(false);
      }
      const user=useDashboardContext();
      console.log(user.user);
      
    if(!setNavbar){
        return (
            <div></div>
        )
    }
    return (<div className="nav-links-menu">
          {NavLinkData.map((item)=>{
            return (
              <Link className="nav-links-link-menu" onClick={handleFalse} key={item.key} to={item.path}>{item.title}</Link>
            )
          })}
    </div>)
  
}

export default NavMenu