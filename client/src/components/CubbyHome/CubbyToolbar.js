import React, { useState } from 'react';
import { CubbyUpload } from './CubbyUpload'

export const CubbyToolbar = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <div className="Toolbar font-lora text-left text-[1.3rem] px-[5%] shadow-toolbar">
        <button className='font-lora m-1 px-2 pb-0.5 rounded-sm text-white bg-emerald-500' onClick={handleShow}>New Cubby</button> 
        <button className='font-lora m-1 px-2 pb-0.5 rounded-sm text-white bg-blue-500' onClick={handleShow}>Manage Cubbies</button> 
      </div>
      <CubbyUpload
        creator={props.creator}
        JWT={props.JWT}
        show={show}
        handleClose={handleClose}
        Logout={props.Logout}
        Login={props.Login}
        fetchCubbies={props.fetchCubbies}
        />
    </>
  )
}
