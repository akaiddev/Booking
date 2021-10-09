import React, { useEffect } from 'react'
import { Button, Card, Col, Image, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Common/Loader'
import Message from '../Common/Message'
import Paginate from '../Components/Paginate'
import { createRoom, deleteRoom, listRooms } from '../Redux/Actions/roomActions'
import { ROOM_CREATE_RESET } from '../Redux/Constants/roomConstants'

const RoomLists = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const roomList = useSelector((state) => state.roomList)
  const { loading, error, rooms, pages, page } = roomList

  const roomDelete = useSelector((state) => state.roomDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = roomDelete

  const roomCreate = useSelector((state) => state.roomCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, room: createdRoom } = roomCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: ROOM_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/room/${createdRoom._id}/edit`)
    } else {
      dispatch(listRooms('', pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdRoom, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteRoom(id))
    }
  }

  const createroomHandler = () => {
    dispatch(createRoom())
  }

  return (
    <Card className='p-3'>
      <Row className='align-items-center my-4'>
        <Col>
          <h1 className='display-4'>
            <i className='fas fa-bed'></i> Room List
          </h1>
        </Col>
        <Col className='text-right'>
          <Button variant='dark' className='col-12 my-3' onClick={createroomHandler}>
            <i className='fas fa-plus'></i> Create room
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>RENTPERDAY</th>
                <th>TYPE</th>
                <th>CONTACT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>
                    <Image src={room.image[0]} alt={room.name} rounded width='50' />
                  </td>
                  <td>{room.name}</td>
                  <td>${room.rentPerDay}</td>
                  <td>{room.type}</td>
                  <td>{room.phoneNumber}</td>
                  <td>
                    <Link to={`/admin/room/${room._id}/edit`}>
                      <Button variant='dark' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>{' '}
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(room._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} />
    </Card>
  )
}

export default RoomLists
