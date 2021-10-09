import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Common/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { saveShippingAddress } from '../Redux/Actions/cartActions'

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/Payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className='display-3 text-center my-5'>
        <i className='fas fa-shipping-fast'></i> Shipping
      </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className='mb-3' controlId='address'>
          <Form.Label column sm='3'>
            Address
          </Form.Label>
          <Col sm='9'>
            <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='city'>
          <Form.Label column sm='3'>
            City
          </Form.Label>
          <Col sm='9'>
            <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='postalCode'>
          <Form.Label column sm='3'>
            Postal Code
          </Form.Label>
          <Col sm='9'>
            <Form.Control type='text' placeholder='Enter postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='country'>
          <Form.Label column sm='3'>
            Country
          </Form.Label>
          <Col sm='9'>
            <Form.Control type='text' placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Col sm={{ span: 9, offset: 3 }}>
            <Button type='submit' variant='dark' className='col-12'>
              Shipping
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default Shipping
