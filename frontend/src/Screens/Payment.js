import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Common/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { savePaymentMethod } from '../Redux/Actions/cartActions'

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/Shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/PlaceOrder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='display-3 text-center my-4'>
        <i className='fas fa-money-check-alt'></i> Payment With
      </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className='mb-3' controlId='address'>
          <Form.Label column sm='3' as='legend'>
            Method
          </Form.Label>
          <Col sm='9'>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Col sm={{ span: 9, offset: 3 }}>
            <Button type='submit' variant='dark' className='col-12'>
              Continue
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default Payment
