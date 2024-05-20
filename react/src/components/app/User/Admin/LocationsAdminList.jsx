import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLocations, setSelectedLocation } from '../../../../slices/location/locationSlice';

const LocationAdminList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const locations = useSelector(state => state.location.locations);
    console.log('locations', locations)
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(URL_API + 'locations');
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setLocations(data.data));
                } else {
                    console.error('Error fetching locations:', response.statusText);
                    setError('Error fetching locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                setError('Error fetching locations');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleClick = (location) => {
        dispatch(setSelectedLocation(location));
        console.log('dispatch', location);
    };
    
    const handleDelete = async (locationId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this location?');
        if (confirmDelete) {
            try {
                const response = await fetch(`${URL_API}locations/${locationId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    console.log('Location deleted:', locationId);
                    // Actualizar el estado local eliminando la ubicación de la lista
                    dispatch(setLocations(locations.filter(location => location.id !== locationId)));
                } else {
                    console.error('Error deleting location:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting location:', error);
            }
        }
    };

    return (
        <div>
            <h1>Locations</h1>
            <ul>
                {locations.map(location => (
                    <li key={location.id}>
                        {location.name} - {location.address} 
                        <Link onClick={() => handleClick(location)} to={`/locations-admin/${location.id}`}>
                            <i className="bi bi-eye"></i>
                        </Link>
                        <button onClick={() => handleDelete(location.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationAdminList;
