import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_API, URL } from '../../../../constants';

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
          console.log('Location deleted:', selectedLocationId);
          // Aquí podrías realizar cualquier acción adicional después de la eliminación del location
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

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {error}</div>;
  if (!location) return <div className="text-center mt-5">No location found</div>;

  return (
    <div className="container mt-5">
      <h1>Location Details</h1>
      <div className="card m-4">
        <div className="row no-gutters">
          <div className="col-md-5">
            <img
              src={URL + location.image} // Ruta de la imagen de la ubicación
              className="card-img"
              alt="Location"
            />
          </div>
          <div className="col-md-4">
            <div className="card-body ">
              <p className="card-text"><strong>Name:</strong> {location.name}</p>
              <hr />
              <p className="card-text"><strong>Location:</strong> {location.direction}</p>
              <hr />
              <p className="card-text"><strong>Phone:</strong> {location.phone}</p>
              <hr />
              <button 
                className="btn btn-danger m-2"
                onClick={handleDelete}
              >
                Delete Location
              </button>
              <Link 
                className="btn btn-primary"
                to="/locations-promoter"
              >
                Back to Location List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPromoterShow;
