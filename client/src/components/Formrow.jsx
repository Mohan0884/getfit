import React from 'react'
import '../assets/styles/Form.css'
function Formrow({name,type,labelText,defaultValue,labels}) {
  return (
    <div className='form-row'>
      {labels && <label style={{color:'#000000'}} htmlFor={name}>{labels}</label>}
        <input type={type} name={name} placeholder={labelText?labelText:""} defaultValue={defaultValue?defaultValue:''} className='form-input'/>
    </div>
  )
}

export default Formrow