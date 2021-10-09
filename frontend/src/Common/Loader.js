import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner className='mb-3' animation='border' role='status' style={{ width: '70px', height: '70px', margin: 'auto', display: 'block' }}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
