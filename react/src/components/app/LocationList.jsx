import React, { useState, useEffect } from 'react';
import { URL_API, URL } from '../../constants';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [promoters, setPromoters] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(URL_API + 'locations');
        if (response.ok) {
          const data = await response.json();
          setLocations(data.data);
        } else {
          console.error('Error al obtener las ubicaciones:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchPromoter = async () => {
      try {
        const response = await fetch(URL_API + 'promoters');
        if (response.ok) {
          const data = await response.json();
          setPromoters(data.data);
        } else {
          console.error('Error al obtener los promotores:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los promotores:', error);
      }
    };

    fetchPromoter();
  }, []);

  console.log('location', locations)
  return (
    <Container>
      <h1 className="mt-4">Ubicaciones</h1>
      {locations.map(location => {
        const promoter = promoters.find(promoter => promoter.id === location.promoter_id);
        return (
          <Link key={location.id} to={`/${location.id}`} className="text-decoration-none">
            <Row className="mt-4 location-item location-link">
              <Col xs={12} md={6}>
                <img
                  src={URL + location.image} // Ruta de la imagen de la ubicación
                  style={{ width: '100%', height: 'auto' }} // Tamaño de la imagen
                />
              </Col>
              <Col xs={12} md={6} className='text-left'>
                <h2>{location.name}</h2>
                <p>Dirección: {location.direction}</p>
                <p>Teléfono: {location.phone}</p>
                {promoter && (
                  <div className="location-promoter">
                    <img
                      src={URL + promoter.image} // Ruta de la imagen del promotor
                    />
                    <p>{promoter.name}</p>
                  </div>
                )}
              </Col>
            </Row>
          </Link>
        );
      })}
    </Container>
  );
};

export default LocationList;
