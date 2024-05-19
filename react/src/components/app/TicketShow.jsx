import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { URL_API } from '../../constants';
import { Spinner, Alert, Container } from 'react-bootstrap';

const TicketShow = () => {
  const userMail = useSelector(state => state.auth.userMail);
  const [userId, setUserId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [movies, setMovies] = useState({});
  const [passes, setPasses] = useState({});
  const [rooms, setRooms] = useState({});
  const [locations, setLocations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${URL_API}users`);
        if (response.ok) {
          const data = await response.json();
          const user = data.data.find(user => user.email === userMail);
          if (user) {
            setUserId(user.id);
          }
        } else {
          console.error('Error al obtener el usuario:', response.statusText);
          setError('Error al obtener el usuario');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setError('Error al obtener el usuario');
      }
    };

    fetchUser();
  }, [userMail]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userId) return;

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
      }
    };

    fetchTickets();
  }, [userId]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (tickets.length === 0) return;

      try {
        const moviePromises = tickets.map(ticket => 
          fetch(`${URL_API}movies/${ticket.movie_id}`)
            .then(response => response.json())
            .then(data => ({ [ticket.movie_id]: data.data }))
        );
        const moviesArray = await Promise.all(moviePromises);
        const moviesMap = moviesArray.reduce((acc, movie) => ({ ...acc, ...movie }), {});
        setMovies(moviesMap);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
        setError('Error al obtener las películas');
      }
    };

    fetchMovies();
  }, [tickets]);

  useEffect(() => {
    const fetchPasses = async () => {
      if (tickets.length === 0) return;

      try {
        const passPromises = tickets.map(ticket =>
          fetch(`${URL_API}passes/${ticket.pass_id}`)
            .then(response => response.json())
            .then(data => ({ [ticket.pass_id]: data.data }))
        );
        const passesArray = await Promise.all(passPromises);
        const passesMap = passesArray.reduce((acc, pass) => ({ ...acc, ...pass }), {});
        setPasses(passesMap);
      } catch (error) {
        console.error('Error al obtener los pases:', error);
        setError('Error al obtener los pases');
      }
    };

    fetchPasses();
  }, [tickets]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (Object.keys(passes).length === 0) return;

      try {
        const roomPromises = Object.values(passes).map(pass =>
          fetch(`${URL_API}rooms/${pass.room_id}`)
            .then(response => response.json())
            .then(data => ({ [pass.room_id]: data.data }))
        );
        const roomsArray = await Promise.all(roomPromises);
        const roomsMap = roomsArray.reduce((acc, room) => ({ ...acc, ...room }), {});
        setRooms(roomsMap);
      } catch (error) {
        console.error('Error al obtener las salas:', error);
        setError('Error al obtener las salas');
      }
    };

    fetchRooms();
  }, [passes]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (Object.keys(passes).length === 0) return;

      try {
        const locationPromises = Object.values(passes).map(pass =>
          fetch(`${URL_API}locations/${pass.location_id}`)
            .then(response => response.json())
            .then(data => ({ [pass.location_id]: data.data }))
        );
        const locationsArray = await Promise.all(locationPromises);
        const locationsMap = locationsArray.reduce((acc, location) => ({ ...acc, ...location }), {});
        setLocations(locationsMap);
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
        setError('Error al obtener las ubicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [passes]);

  if (loading) return <div className="text-center"><Spinner /></div>;
  if (error) return <Alert color="danger">{error}</Alert>;
  if (tickets.length === 0) return <div>No tickets found</div>;

  return (
    <Container>
      <h1 className="my-4">Tickets</h1>
    <div className="ticket-container">
      {tickets.map(ticket => (
        <div className="ticket-card" key={ticket.id}>
          <div className="ticket-card-title">{locations[passes[ticket.pass_id]?.location_id]?.name || 'Loading...'}</div>
          <div className="ticket-card-text">
            <strong>Movie Title:</strong> {movies[ticket.movie_id]?.title || 'Loading...'}<br />
            <strong>Pass Date:</strong> {passes[ticket.pass_id]?.date || 'Loading...'}<br />
            <strong>Pass Time:</strong> {passes[ticket.pass_id]?.start_time || 'Loading...'}<br />
            <strong>Room Name:</strong> {rooms[passes[ticket.pass_id]?.room_id]?.name || 'Loading...'}<br />
            <strong>Location Name:</strong> {locations[passes[ticket.pass_id]?.location_id]?.name || 'Loading...'}
          </div>
        </div>
      ))}
    </div>
    </Container>
  );
};

export default TicketShow;
