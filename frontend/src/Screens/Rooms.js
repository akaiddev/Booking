import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Common/Loader'
import Message from '../Common/Message'
import Paginate from '../Components/Paginate'
import Room from '../Components/Room'
import SearchRooms from '../Components/SearchRooms'
import { listRooms } from '../Redux/Actions/roomActions'

const Rooms = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const roomList = useSelector((state) => state.roomList)

  const { loading, error, rooms, page, pages } = roomList

  useEffect(() => {
    dispatch(listRooms(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      <SearchRooms />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {rooms.map((room) => (
              <Col xs={12} sm={6} md={6} lg={6} key={room._id}>
                <Room room={room} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </div>
  )
}

export default Rooms
