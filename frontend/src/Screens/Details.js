import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Common/Loader'
import Message from '../Common/Message'
import Rating from '../Components/Rating'
import RoomSeo from '../Components/RoomSeo'
import { createRoomReview, listRoomDetails } from '../Redux/Actions/roomActions'

const Details = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const roomDetails = useSelector((state) => state.roomDetails)
  const { loading, error, room } = roomDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const roomReviewCreate = useSelector((state) => state.roomReviewCreate)
  const { success: successRoomReview, loading: loadingRoomReview, error: errorRoomReview } = roomReviewCreate

  useEffect(() => {
    dispatch(listRoomDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/Cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createRoomReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <RoomSeo title={room.name} />
          <Row>
            <Col md={8}>
              <Carousel>
                {room.image.map((img) => (
                  <Carousel.Item interval={2000} key={img}>
                    <img className='d-block w-100' src={img} alt={room.name} />
                  </Carousel.Item>
                ))}
              </Carousel>

              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Room Description </h2>
                  <h6>{room.description}</h6>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3> {room.name}</h3>
                </ListGroupItem>

                <ListGroupItem>
                  <h6>Max Stock: Up to {room.countInStock} Stock</h6>
                </ListGroupItem>

                <ListGroupItem>
                  <h6>Type: {room.type}</h6>
                </ListGroupItem>

                <ListGroupItem>
                  <h6>Contact: {room.phoneNumber}</h6>
                </ListGroupItem>

                <ListGroupItem>
                  <Rating value={room.rating} text={` ${room.numReviews} Reviews`} />
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Rent Per Day: </Col>
                    <Col>${room.rentPerDay}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status: </Col>
                    <Col>{room.countInStock > 0 ? 'Available' : 'Not Available'}</Col>
                  </Row>
                </ListGroupItem>

                {room.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Quantity: </Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(room.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button type='button' variant='dark' className='col-12' onClick={addToCartHandler} disabled={room.countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

          <Card className='p-4 mt-3'>
            <Row>
              <Col md={6}>
                <h1 className='display-4'>
                  <i className='fas fa-comments'></i> Reviews
                </h1>
                {room.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {room.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              <Col md={6}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h1 className='display-5'>
                      <i className='fas fa-pen-alt'></i> Write a Review
                    </h1>

                    {successRoomReview && <Message variant='success'>Review submitted successfully</Message>}
                    {loadingRoomReview && <Loader />}
                    {errorRoomReview && <Message variant='danger'>{errorRoomReview}</Message>}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group as={Row} className='mb-3' controlId='Rating'>
                          <Form.Label column sm='3'>
                            Rating
                          </Form.Label>
                          <Col sm='9'>
                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3' controlId='comment'>
                          <Form.Label column sm='3'>
                            Comment
                          </Form.Label>
                          <Col sm='9'>
                            <Form.Control as='textarea' rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3'>
                          <Col sm={{ span: 9, offset: 3 }}>
                            <Button disabled={loadingRoomReview} type='submit' variant='dark' className='col-12'>
                              Submit
                            </Button>
                          </Col>
                        </Form.Group>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </>
  )
}

export default Details
