import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Common/FormContainer'
import Loader from '../Common/Loader'
import Message from '../Common/Message'
import { listRoomDetails, updateRoom } from '../Redux/Actions/roomActions'
import { ROOM_UPDATE_RESET } from '../Redux/Constants/roomConstants'

const RoomEdit = ({ match, history }) => {
  const roomId = match.params.id

  const [name, setName] = useState('')
  const [rentPerDay, setRentPerDay] = useState(0)
  const [image, setImage] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [type, setType] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const roomDetails = useSelector((state) => state.roomDetails)
  const { loading, error, room } = roomDetails

  const roomUpdate = useSelector((state) => state.roomUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = roomUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ROOM_UPDATE_RESET })
      history.push('/admin/RoomLists')
    } else {
      if (!room.name || room._id !== roomId) {
        dispatch(listRoomDetails(roomId))
      } else {
        setName(room.name)
        setRentPerDay(room.rentPerDay)
        setImage(room.image)
        setPhoneNumber(room.phoneNumber)
        setType(room.type)
        setCountInStock(room.countInStock)
        setDescription(room.description)
      }
    }
  }, [dispatch, history, roomId, room, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateRoom({ _id: roomId, name, rentPerDay, image, phoneNumber, type, description, countInStock }))
  }

  return (
    <FormContainer>
      <h1 className='display-4 text-center my-4'>
        <i className='fas fa-edit'></i> Room Updates
      </h1>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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

          <Form.Group as={Row} className='mb-3' controlId='type'>
            <Form.Label column sm='3'>
              Room Type
            </Form.Label>
            <Col sm='9'>
              <Form.Control type='text' placeholder='Room Type' value={type} onChange={(e) => setType(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='image'>
            <Form.Label column sm='3'>
              Image
            </Form.Label>
            <Col sm='9'>
              <Form.Control type='text' value={image} onChange={(e) => setImage(e.target.value)} />
              <Form.Control type='file' label='Choose File' custom='true' onChange={uploadFileHandler} multiple />
            </Col>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='rentPerDay'>
            <Form.Label column sm='3'>
              Rent Per Day
            </Form.Label>
            <Col sm='9'>
              <Form.Control type='number' value={rentPerDay} onChange={(e) => setRentPerDay(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='phoneNumber'>
            <Form.Label column sm='3'>
              Phone Number
            </Form.Label>
            <Col sm='9'>
              <Form.Control type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='CountInStock'>
            <Form.Label column sm='3'>
              Count In Stock
            </Form.Label>
            <Col sm='9'>
              <Form.Control type='number' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3' controlId='CountInStock'>
            <Form.Label column sm='3'>
              Description
            </Form.Label>
            <Col sm='9'>
              <Form.Control as='textarea' rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
    </FormContainer>
  )
}

export default RoomEdit
