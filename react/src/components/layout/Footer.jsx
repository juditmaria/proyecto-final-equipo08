import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="text-center text-lg-start fixed-bottom bg-dark">
      <Container className='mb-1'>
        <Row className="justify-content-center align-items-center" style={{ height: '100px' }}>
          <Col md={4} className="d-flex justify-content-center">
            <a href="https://x.com/elonmusk"><i className="bi bi-twitter m-4 blue fs-3"></i></a>
            <a href="https://www.instagram.com/elonmusk__.official/?hl=es"><i className="bi bi-instagram red fs-3"></i></a>
            <a href="https://www.tiktok.com/@mrbeast?lang=es"><i className="bi bi-tiktok m-4 blue fs-3"></i></a>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-center">
            <h5 className='red'>Contacto</h5>
            <p>+34 912 345 678</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
