import React from 'react'
import '../assets/styles/Landing.css'
import {Link} from 'react-router-dom'
import Logo from '../components/Logo'
import Tab from '../assets/images/Rectangle48.png';
import Man from '../assets/images/man-gym.png'
import Women from '../assets/images/female-gym.png'
import Contact from './Contact';
import BottomContainer from '../components/BottomContainer';


function Landing() {
  return (
    <div className='landing'>
      <div className="landing-navbar">
        <Logo/>
      </div>
        <div className="landing-main">
          <div className="landing-main-left">
            <p className="landing-quote">
            GET HEALTHY BODY WITH PERFECT EXERCISES
            </p>
            <p className='landing-motives'>
            Power, perseverance, and discipline.
            </p>

            <Link to='/login' className='landing-button'>Get Started</Link>
          </div>
          <div className="landing-main-right">
            <div className="images-landing">
            <img className='women-gym' src={Women} alt="" />

            <img className='man-gym' src={Man} alt="" />
            </div>
             

          </div>
        </div>
        
        <Contact/>
        <BottomContainer/>
    </div>
  )
}

export default Landing