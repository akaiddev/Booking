import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Common/Loader'
import Message from '../Common/Message'
import { listMyOrders } from '../Redux/Actions/orderActions'
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../Redux/Constants/userConstants'

const Profile = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updateUser = useSelector((state) => state.updateUser)
  const { success } = updateUser

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={4}>
        <Card className='p-3'>
          <h1 className='display-3 text-center my-5'>
            <i className='fas fa-user-alt'></i> Profile
          </h1>
          {message && <Message variant='danger'>{message}</Message>}
          {}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group as={Row} className='mb-3' controlId='Name'>
                <Form.Label column sm='3'>
                  Name
                </Form.Label>
                <Col sm='9'>
                  <Form.Control type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3' controlId='Email'>
                <Form.Label column sm='3'>
                  Email
                </Form.Label>
                <Col sm='9'>
                  <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3' controlId='Password'>
                <Form.Label column sm='3'>
                  Password
                </Form.Label>
                <Col sm='9'>
                  <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3' controlId='confirmPassword'>
                <Form.Label column sm='3'>
                  Confirm
                </Form.Label>
                <Col sm='9'>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button type='submit' variant='dark' className='col-12'>
                    Update
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Card>
      </Col>
      <Col md={8}>
        <Card className='p-3'>
          <h1 className='display-5 my-3'>
            <i className='fab fa-first-order'></i> My Orders List
          </h1>

          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='dark'>
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default Profile
