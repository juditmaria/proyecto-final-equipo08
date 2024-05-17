import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URL_API, URL } from '../../constants';
import { Container, Button, ButtonGroup, Row, Col } from 'react-bootstrap';


const PassesShow = () => {
  const { id, movieid } = useParams();
  const navigate = useNavigate();
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const response = await fetch(`${URL_API}passes`);
        if (response.ok) {
          const data = await response.json();
          const filteredPasses = data.data.filter(pass => pass.location_id === parseInt(id) && pass.movie_id === parseInt(movieid));
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
  }, [id, movieid]);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(URL_API + `movies/${movieid}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data.data);
        } else {
          console.error('Error al obtener la película:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener la película:', error);
      }
    };

    fetchMovie();
  }, [movieid]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectPass = (passid) =>{
    navigate('/select-tickets',{state: { passid, movieid }});
  };

  const uniqueDates = [...new Set(passes.map(pass => pass.date))];

  const filteredPasses = selectedDate
    ? passes.filter(pass => pass.date === selectedDate)
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;







  return (
    <Container className='mt-4'>
      <div className="dates-container bg-dark p-3 mb-3 rounded">
        <ButtonGroup aria-label="Available Dates">
          {uniqueDates.map(date => (
            <Button
              key={date}
              variant={selectedDate === date ? "primary" : "outline-primary"}
              onClick={() => handleDateChange(date)}
              size="sm"
            >
              {date}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      
      {movie ? (
        <Row className="mb-3">
          <Col md={4}>
            <img 
              src={URL + movie.image}
              alt={movie.title}
              className="img-fluid"
            />
          </Col>
          <Col md={8} className='text-left p-4'>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Duración:</strong> {movie.length} minutos</p>
            <p><strong>Tipo:</strong> {movie.type}</p>
            <p><strong>Año de lanzamiento:</strong> {movie.release_year}</p>
            <p><strong>Tráiler:</strong> <a href={movie.trailer} target="_blank" rel="noopener noreferrer">Ver tráiler</a></p>
          </Col>
        </Row>
      ) : (
        <p>Cargando...</p>
      )}

      {selectedDate && (
        <div className="times-container bg-dark p-3 rounded">
          <ButtonGroup aria-label="Available Times">
            {filteredPasses.map(pass => (
              <Button
                key={pass.id}
                variant="outline-secondary"
                size="sm"
                onClick={() => handleSelectPass(pass.id)}
              >
                {pass.start_time}
                
              </Button>
            ))}
          </ButtonGroup>
        </div>
      )}
    </Container>
  );
};

export default PassesShow;