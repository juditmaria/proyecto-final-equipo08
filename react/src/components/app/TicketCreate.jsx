import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { URL_API, URL } from '../../constants';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export const TicketCreate = () => {
  const location = useLocation();
  const { passid, movieid } = location.state || {}; // Acceder a las id pasadas en el estado
  const userMail = useSelector(state => state.auth.userMail); // Obtener el correo electrónico del estado global

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [userId, setUserId] = useState(null); // Estado para almacenar el user_id
  const ticketPrice = 8; // Precio por entrada
  const totalPrice = ticketCount * ticketPrice; // Precio total

  console.log('Mail', userMail)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${URL_API}movies/${movieid}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data.data);
        } else {
          console.error('Error al obtener la película:', response.statusText);
          setError('Error al obtener la película');
        }
      } catch (error) {
        console.error('Error al obtener la película:', error);
        setError('Error al obtener la película');
      } finally {
        setLoading(false);
      }
    };

    if (movieid) {
      fetchMovie();
    }
  }, [movieid]);

  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const response = await fetch(${URL_API}user);
  //       if (response.ok) {
  //         const data = await response.json();
  //         // Filtrar el usuario por correo electrónico para obtener el user_id
  //         const user = data.filter(user => user.email === userMail);
  //         if (user.length > 0) {
  //           setUserId(user.data);
  //         } else {
  //           setErrorUserId('Usuario no encontrado');
  //         }
  //       } else {
  //         console.error('Error al obtener el user_id:', response.statusText);
  //         setErrorUserId('Error al obtener el user_id');
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener el user_id:', error);
  //       setErrorUserId('Error al obtener el user_id');
  //     } finally {
  //       setLoadingUserId(false);
  //     }
  //   };

  //   if (userMail) {
  //     fetchUserId();
  //   }
  // }, [userMail]);

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const response = await fetch(`${URL_API}users`);
        if (response.ok) {
          const data = await response.json();
          const user = data.data.filter(user => user.email === userMail);
          if (user.length > 0) {
            setUserId(user[0].id);
          }
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
  }, [userMail]);

  console.log('user', userId)


  const handleBuyTicket = async () => {
    try {
      // Iterar sobre el número de entradas y realizar una inserción por cada una
      for (let i = 0; i < ticketCount; i++) {
        const response = await fetch(`${URL_API}tickets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pass_id: passid,
            movie_id: movieid,
            user_id: userId,
            price: ticketPrice,
          })
        });
        window.location.href = `/tickets`;

        if (!response.ok) {
          console.error('Error al realizar la compra para la entrada', i + 1, ':', response.statusText);
        }
      }
      // Si todas las inserciones fueron exitosas, mostrar un mensaje
      console.log('¡Compra realizada con éxito para', ticketCount, 'entradas!');
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };
  

  const handleIncrease = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrease = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className='mt-4'>
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

      <div className="ticket-selection">
        <h2>Selecciona el número de entradas</h2>
        <div className="ticket-controls">
          <Button onClick={handleDecrease} disabled={ticketCount <= 1}>-</Button>
          <span className="ticket-count">{ticketCount}</span>
          <Button onClick={handleIncrease}>+</Button>
        </div>
        <div className="ticket-price">
          <p>Precio por entrada: {ticketPrice} €</p>
          <p>Precio total: {totalPrice} €</p>
        </div>
        <Button onClick={handleBuyTicket}>Comprar</Button>

      </div>
    </Container>
  );
};

export default TicketCreate;