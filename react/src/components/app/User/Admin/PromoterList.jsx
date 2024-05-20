// PromoterList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setPromoterId, setPromoterName, setPromoterImg } from '../../../../slices/promoter/promoterSlice';
import { useDispatch } from 'react-redux';

const PromoterList = () => {
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPromoters = async () => {
      try {
        const response = await fetch(URL_API + 'promoters');
        if (response.ok) {
          const data = await response.json();
          setPromoters(data.data);
        } else {
          console.error('Error fetching promoters:', response.statusText);
          setError('Error fetching promoters');
        }
      } catch (error) {
        console.error('Error fetching promoters:', error);
        setError('Error fetching promoters');
      } finally {
        setLoading(false);
      }
    };

    fetchPromoters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleClick = (promoter) => {
    dispatch(setPromoterId(promoter.id));
    dispatch(setPromoterName(promoter.name));
    dispatch(setPromoterImg(promoter.image));
    console.log('dispatch', promoter);
  };
  
  const handleDelete = async (promoterId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this promoter?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}promoters/${promoterId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log('Promoter deleted:', promoterId);
          // Actualizar el estado local eliminando el promotor de la lista
          setPromoters(promoters.filter(promoter => promoter.id !== promoterId));
        } else {
          console.error('Error deleting promoter:', response.statusText);
          // Manejo de errores si la eliminación no fue exitosa
        }
      } catch (error) {
        console.error('Error deleting promoter:', error);
        // Manejo de errores si ocurre algún problema con la solicitud HTTP
      }
    }
  };
  
  return (
    <div>
      <h1>Promoters</h1>
      <ul>
        {promoters.map(promoter => (
          <li key={promoter.id}>
            {promoter.name} - {promoter.image} 
            <Link onClick={() => handleClick(promoter)} to={`/promoters/${promoter.id}`} >
              <i className="bi bi-eye"></i>
            </Link>
            <button onClick={() => handleDelete(promoter.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromoterList;
