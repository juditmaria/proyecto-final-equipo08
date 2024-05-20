import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../../../../constants';
import { setLocations } from '../../../../slices/location/locationSlice';

const LocationAdminCreate = () => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.promoter.promoterId);
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [direction, setDirection] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('promoter_id', selectedUser);
            formData.append('direction', direction);
            formData.append('image', image);

            const response = await fetch(URL_API + 'locations', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const newLocation = await response.json();
                dispatch(setLocations(prevLocations => [...prevLocations, newLocation]));
                // Navegar de vuelta a la lista de ubicaciones
                window.location.href = '/locations-admin';
            } else {
                setError('Error creating location');
            }
        } catch (error) {
            setError('Error creating location');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Create Location</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Direction:</label>
                    <input
                        type="text"
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default LocationAdminCreate;
