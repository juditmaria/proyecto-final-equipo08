import React from 'react'
import { Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="text-center text-lg-start fixed-bottom">
      <Container className='mb-4'>
        <Col>
          <Link >Quien somos?</Link>
        </Col>
      </Container>
    </div>
  )
}

export default Footer