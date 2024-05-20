import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';

const LocationPromoterShow = () => {
  const selectedLocationId = useSelector(state => state.location.selectedLocation?.id);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedLocationId) return;

      try {
        const response = await fetch(`${URL_API}locations/${selectedLocationId}`);
        if (response.ok) {
          const locationData = await response.json();
          setLocation(locationData.data);
        } else {
          console.error('Error fetching location:', response.statusText);
          setError('Error fetching location');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setError('Error fetching location');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [selectedLocationId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this location?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}locations/${selectedLocationId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log('Usuario eliminado:', selectedLocationId);
          // Aquí podrías realizar cualquier acción adicional después de la eliminación del usuario
        } else {
          console.error('Error deleting location:', response.statusText);
          // Manejo de errores si la eliminación no fue exitosa
        }
      } catch (error) {
        console.error('Error deleting location:', error);
        // Manejo de errores si ocurre algún problema con la solicitud HTTP
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>No location found</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
      <h1>Location Details</h1>
      <p><strong>Name:</strong> {location.name}</p>
      <p><strong>Location:</strong> {location.direction}</p>
      <p><strong>Phone:</strong> {location.phone}</p>

      <button style={{ margin: '10px', padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleDelete}>Delete Location</button>
      <Link style={{ textDecoration: 'none', color: 'blue' }} to="/locations-promoter">Back to Location List</Link>
      {/* Render other location details as needed */}
    </div>
  );
};

export default LocationPromoterShow;
