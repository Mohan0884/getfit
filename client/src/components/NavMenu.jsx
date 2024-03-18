import React, { useState } from 'react'
import { NavLinkData } from './NavLinkData'
import { Link,NavLink } from 'react-router-dom'
import '../assets/styles/Navbar.css'
import { useDashboardContext } from '../pages/DashboardLayout';
function NavMenu({showSetNavbar}) {

    function handleFalse(e){
        showSetNavbar(false);
    }
      const user=useDashboardContext();
      console.log(user.user);
   
    return (<div className="nav-links-menu" >
          {NavLinkData.map((item)=>{
            return (
              <NavLink className="nav-links-link-menu" onClick={handleFalse} key={item.key} to={item.path}>{item.title}</NavLink>
            )
          })}
    </div>)
  
}

export default NavMenu