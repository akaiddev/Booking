import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../Components/Rating'

const Room = ({ room }) => {
  return (
    <Card className='my-3'>
      <Link to={`/Details/${room._id}`}>
        <Card.Img variant='top' src={room.image[0]} alt={room.name} title={room.type} />
      </Link>

      <Card.Body>
        <Card.Title as={Link} to={`/Details/${room._id}`}>
          {room.name}
        </Card.Title>

        <Card.Text as='div'>
          <Rating value={room.rating} text={` ${room.numReviews} Reviews`} />
        </Card.Text>

        <Card.Text as='div'>Rent Per Day: ${room.rentPerDay}</Card.Text>

        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <Link to={`/Details/${room._id}`} className='btn btn-dark my-3 col-6'>
            More Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Room
