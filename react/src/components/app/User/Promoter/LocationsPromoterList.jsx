import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLocations, setSelectedLocation } from '../../../../slices/location/locationSlice';

const LocationPromoterList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const locations = useSelector(state => state.location.locations);
    const selectedUser = useSelector(state => state.promoter.promoterId);
    console.log('Promoter:', selectedUser);
    console.log('Locations:', locations);
    
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(URL_API + 'locations');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched locations:', data.data);

                    // Verificar tipo de datos de promoter_id y selectedUser
                    console.log('Selected User:', selectedUser);
                    const filteredLocations = data.data.filter(location => {
                        console.log('Checking location:', location);
                        return location.promoter_id == selectedUser;
                    });
                    console.log('Filtered locations:', filteredLocations);

                    dispatch(setLocations(filteredLocations));
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

        if (selectedUser !== null && selectedUser !== undefined) {
            fetchLocations();
        } else {
            setLoading(false);
        }
    }, [dispatch, selectedUser]);



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
                        <Link onClick={() => handleClick(location)} to={`/locations-promoter/${location.id}`}>
                            <i className="bi bi-eye"></i>
                        </Link>
                        
                        <button onClick={() => handleDelete(location.id)}>
                            <i className="bi bi-trash"></i>
                        </button>
                        <Link to={`/locations-promoter/${location.id}/passes`}>
                            Passes
                        </Link>
                    </li>
                ))}
                <Link to={`/locations-promoter/create`}>
                    Crear
                </Link>
            </ul>
        </div>
    );
};

export default LocationPromoterList;