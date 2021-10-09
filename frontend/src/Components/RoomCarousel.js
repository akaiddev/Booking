import React, { useEffect } from 'react'
import { Carousel, Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Common/Loader'
import Message from '../Common/Message'
import { listTopRooms } from '../Redux/Actions/roomActions'

const RoomCarousel = () => {
  const dispatch = useDispatch()

  const roomTopRated = useSelector((state) => state.roomTopRated)
  const { loading, error, rooms } = roomTopRated

  useEffect(() => {
    dispatch(listTopRooms())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark py-3'>
      {rooms.map((room) => (
        <Carousel.Item interval={2000} key={room._id}>
          <Row>
            <Col>
              <Carousel.Caption>
                <Link to={`/Details/${room._id}`}>
                  <Carousel.Caption>
                    <h3 className='text-left'>{room.name}</h3>
                    <p>RentPerDay: ${room.rentPerDay} only</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Caption>
            </Col>
            <Col>
              <Link to={`/Details/${room._id}`}>
                <Image className='d-block w-100' src={room.image[0]} alt={room.name} />
              </Link>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default RoomCarousel
