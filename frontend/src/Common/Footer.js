import React from 'react'

const Footer = () => {
  return (
    <div className='py-2 text-center border-top bg-dark text-light'>
      <h4 className='pt-4'>
        <i className='fab fa-stack-exchange'></i> Booking &copy;{new Date().getFullYear()} All Rights Reserved.
      </h4>
      <h6>
        <i className='fab fa-envira'></i> Design & Development by <i className='fas fa-heart'></i> Abdur Rahman Akaid
      </h6>
    </div>
  )
}

export default Footer
