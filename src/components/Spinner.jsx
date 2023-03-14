import React from 'react';
import SpinnerImg from "../assets/spinner.svg";

const Spinner = () => {
  return (
    <div className='flex bg-black bg-opacity-50 items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
      <div>
         <img src={SpinnerImg} alt="Loading..." className='h-24'/>

      </div>
    </div>

  )
}

export default Spinner
