import React, { useState, useEffect } from 'react';
import { URL_API, URL } from '../../constants';
import { Link } from 'react-router-dom';

const Location = () => {
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






  

  return (
    <div>
      <h1>Ubicaciones</h1>
      <ul>
        {locations.map(location => {
          const promoter = promoters.find(promoter => promoter.id === location.promoter_id);
          return (
            <li key={location.id}>
              <Link to={`/${location.pass_id}`}><h2>{location.name}</h2></Link>
              <p>Dirección: {location.direction}</p>
              <p>Teléfono: {location.phone}</p>
              {promoter && (
                <div>
                  <p>Promotor: {promoter.name}</p>
                  <img 
                    src={`${URL}/storage/${promoter.image}`} // Ruta de la imagen del promotor
                    alt={promoter.name}
                    style={{ width: '100px', height: 'auto' }} // Tamaño de la imagen
                  />
                </div>
              )}
              <img 
                src={`${URL}/storage/${location.image}`} // Ruta de la imagen de la ubicación
                alt={location.name}
                style={{ width: '200px', height: 'auto' }} // Tamaño de la imagen
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Location;
