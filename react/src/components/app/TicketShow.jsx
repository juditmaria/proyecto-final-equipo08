import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { URL_API, URL } from '../../constants';

const TicketShow = () => {
  const userId = useSelector(state => state.auth.userId);  
  const [tickets, setTickets] = useState([]);
  const [movie, setMovie] = useState(null);

  console.log('user', userId)
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${URL_API}tickets`);
        if (response.ok) {
          const data = await response.json();
          const filteredTickets = data.data.filter(ticket => ticket.user_id === userId);
          setTickets(filteredTickets);
        } else {
          console.error('Error al obtener los tickets:', response.statusText);
          setError('Error al obtener los tickets');
        }
      } catch (error) {
        console.error('Error al obtener los tickets:', error);
        setError('Error al obtener los tickets');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTickets();
    }
  }, [userId]);


  console.log('tickets', tickets)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(URL_API + `movies/${tickets.movie_id}`);
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
  }, [tickets.movie_id]);

  console.log('movie', movie)

  return (
    <div>
      hola
    </div>
  );
};

export default TicketShow;
