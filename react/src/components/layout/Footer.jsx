import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="text-center text-lg-start fixed-bottom">
      <Container className='mb-4'>
        <Row>
          <Col md={4}>
            <h5 className='blue'>Quiénes somos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about">Quiénes somos</Link>
              </li>
              <li>
                <Link to="/terms">Términos y condiciones</Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            
            <a href="https://x.com/elonmusk"><i class="bi bi-twitter m-4 blue fs-3"></i></a>
            <a href="https://www.instagram.com/elonmusk__.official/?hl=es"><i class="bi bi-instagram red fs-3"></i></a>
            <a href="https://www.tiktok.com/@mrbeast?lang=es"><i class="bi bi-tiktok m-4 blue fs-3" ></i></a>
          </Col>
          <Col md={4}>
            <h5 className='red'>Contacto</h5>
            <p>+34 912 345 678</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
