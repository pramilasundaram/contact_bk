import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
export default function Spiners() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <Spinner  animation="border" variant="primary" />
    &nbsp; Loading...
    </div>
  )
}
