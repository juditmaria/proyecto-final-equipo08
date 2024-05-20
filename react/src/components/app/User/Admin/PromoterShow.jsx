// PromoterShow.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';

const PromoterShow = () => {
  const selectedPromoterId = useSelector(state => state.promoter.promoterId);
  const [promoter, setPromoter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('promoters', selectedPromoterId)

  useEffect(() => {
    const fetchPromoter = async () => {
      if (!selectedPromoterId) return;

      try {
        const response = await fetch(`${URL_API}promoters/${selectedPromoterId}`);
        if (response.ok) {
          const promoterData = await response.json();
          setPromoter(promoterData.data);
        } else {
          console.error('Error fetching promoter:', response.statusText);
          setError('Error fetching promoter');
        }
      } catch (error) {
        console.error('Error fetching promoter:', error);
        setError('Error fetching promoter');
      } finally {
        setLoading(false);
      }
    };

    fetchPromoter();
  }, [selectedPromoterId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this promoter?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}promoters/${selectedPromoterId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log('Promoter deleted:', selectedPromoterId);
          // Aquí podrías realizar cualquier acción adicional después de la eliminación del promotor
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!promoter) return <div>No promoter found</div>;

  return (
    <div>
      <h1>Promoter Details</h1>
      <p>Name: {promoter.name}</p>
      <p>Email: {promoter.email}</p>
      <p>ID: {promoter.id}</p>
      <button onClick={handleDelete}>Delete Promoter</button>
      <Link to="/promoters">Back to Promoter List</Link>
      {/* Render other promoter details as needed */}
    </div>
  );
};

export default PromoterShow;
