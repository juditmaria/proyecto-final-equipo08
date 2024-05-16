import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../constants';

const PassesShow = () => {
  const { id, movieid } = useParams();
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Passes for Location ID: {id} and Movie ID: {movieid}</h2>
      <ul>
        {passes.map(pass => (
          <li key={pass.id}>
            Room ID: {pass.room_id}, Date: {pass.date}, Start Time: {pass.start_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassesShow;
