import React, { useState } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'

const SearchRooms = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/rooms')
    }
  }

  return (
    <Row className='justify-content-md-center bg-light py-5 my-3'>
      <Col md={6}>
        <Form onSubmit={submitHandler}>
          <Row className='align-items-center'>
            <Col sm={12} className='my-1'>
              <Form.Label htmlFor='SearchRoom' visuallyHidden>
                Search Rooms
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Control type='text' name='q' size='lg' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Rooms...' />
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchRooms
