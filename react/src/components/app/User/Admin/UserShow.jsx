import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';

const UserShow = () => {
  const selectedUserId = useSelector(state => state.user.selectedUser?.id);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedUserId) return;

      try {
        const response = await fetch(`${URL_API}users/${selectedUserId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.data);
        } else {
          console.error('Error fetching user:', response.statusText);
          setError('Error fetching user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Error fetching user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [selectedUserId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}users/${selectedUserId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          console.log('Usuario eliminado:', selectedUserId);
          // Aquí podrías realizar cualquier acción adicional después de la eliminación del usuario
        } else {
          console.error('Error deleting user:', response.statusText);
          // Manejo de errores si la eliminación no fue exitosa
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        // Manejo de errores si ocurre algún problema con la solicitud HTTP
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <button onClick={handleDelete}>Delete User</button>
      <Link to="/users">Back to User List</Link>
      {/* Render other user details as needed */}
    </div>
  );
};

export default UserShow;
