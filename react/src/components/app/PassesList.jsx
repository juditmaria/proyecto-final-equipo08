import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { URL_API, URL } from '../../constants';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PassesList = () => {
  const { id } = useParams();
  const [passes, setPasses] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const response = await fetch(`${URL_API}passes`);
        if (response.ok) {
          const data = await response.json();
          const filteredPasses = data.data.filter(pass => pass.location_id === parseInt(id));
          setPasses(filteredPasses);
        } else {
          console.error('Error al obtener los pases:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los pases:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPasses();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${URL_API}movies`);
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

  useEffect(() => {
    if (passes.length && movies.length) {
      const passMovieIds = passes.map(pass => pass.movie_id);
      const filteredMovies = movies.filter(movie => passMovieIds.includes(movie.id));
      setFilteredMovies(filteredMovies);
    }
  }, [passes, movies]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="mt-4">
        {currentMovies.map(movie => (
          <Col key={movie.id} xs={12} sm={6} md={3} className="mb-4">
            <Link to={`/${id}/passes/${movie.id}`}>
              <img
                src={URL + movie.image}
                alt={movie.title}
                className="w-100 movie-image"
              />
            </Link>
          </Col>
        ))}
      </Row>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }, (_, i) => (
          <Button 
            key={i + 1} 
            onClick={() => paginate(i + 1)} 
            className="page-link"
            variant={currentPage === i + 1 ? 'primary' : 'secondary'}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default PassesList;
