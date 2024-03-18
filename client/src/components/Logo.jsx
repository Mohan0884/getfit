import React from 'react'
import '../assets/styles/logo.css'
import {Link} from 'react-router-dom'
function Logo() {
  return (
        <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
  )
}

export default Logo