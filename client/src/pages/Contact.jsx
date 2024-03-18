import React from 'react'
import Formrow from '../components/Formrow'
import {Link} from 'react-router-dom'
import Logo from '../components/Logo'
import Img from '../assets/images/create-account.png'
import '../assets/styles/Form.css'

function Contact() {
  return (
    <div className='form'>
      <div className="forms">
      <div className="forms-left">
        <Link className='landing-logo'> Get<span className='landing-logo-yellow'>Fit</span></Link>
          <img className='form-image' src={Img} alt="" />
      </div>
      <form className="forms-right" action="">

      <h4 className='form-title'>CONTACT US</h4>
        <Formrow type="text" name="name" labelText="FIRST NAME" />
        <Formrow type="text" name="lastName" labelText="LAST NAME"/>
        <Formrow type="email" name="email" labelText="EMAIL"/>
        <textarea className='form-input' placeholder='MESSAGE' name="messagecontact" id="messagecontact" cols="30" rows="30"   style={{ resize: 'none', paddingRight:"10px",height:"100px"}}></textarea>
        <button type="submit" className='submit-btn'>SUBMIT</button>
      </form>
      </div>  
    </div>
  )
}

export default Contact