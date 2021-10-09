import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
      <Row className='d-flex justify-content-center text-center  align-items-center vh-100 '>
        <Col xs={12} md={6}>
          <Card className='p-4'>
            <h1 className='display-1 '>
              <i className='fas fa-bug'></i>
            </h1>
            <h2>404 Page Not Found</h2>
            <p>Oh snap! You got an error!</p>

            <Link to='/' className='btn btn-dark col-12 btn-lg'>
              Go Back To Home
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
