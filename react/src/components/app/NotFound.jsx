import React from 'react'
import Layout from '../layout/Layout';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import NotFoundImage from '../../assets/notfound.png';

const NotFound = () => {
  return (
    <div>
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '75vh' }}>
        <Image src={NotFoundImage} fluid className="not-found-image" />
        <p className="mt-3">Página no encontrada</p>
      </Container>
    </div>
  )
}

export default NotFound