import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center my-5'>
        <Col xs={12} md={6}>
          <Card className='p-3'>{children}</Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
