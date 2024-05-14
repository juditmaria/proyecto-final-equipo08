import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API, URL } from '../../constants';
import { Container, Row, Col } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(URL_API + 'movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data.data);
        } else {
          console.error('Error al obtener las películas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Películas</h1>
      <Container>
        <Row>
          {movies.map((movie, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`${URL}${movie.image}`}
                  style={{ width: '100%', height: 'auto', marginBottom: '15px' }}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MovieList;
