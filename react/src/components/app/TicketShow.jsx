import React from 'react';
import { useLocation } from 'react-router-dom';

const TicketShow = () => {
  const location = useLocation();
  const { movie } = location.state || {};

  

  return (
    <div>
      <h2>Ticket Details</h2>
      {movie && (
        <div>
          <h3>Película: {movie.title}</h3>
          {/* Otros detalles de la película aquí */}
        </div>
      )}
    </div>
  );
};

export default TicketShow;
