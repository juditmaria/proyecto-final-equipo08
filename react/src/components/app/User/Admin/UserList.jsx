import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setSelectedUser } from '../../../../slices/user/userSlice';
import { useDispatch } from 'react-redux';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(URL_API + 'users');
          if (response.ok) {
            const data = await response.json();
            setUsers(data.data);
          } else {
            console.error('Error fetching users:', response.statusText);
            setError('Error fetching users');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          setError('Error fetching users');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    const handleClick = (user) => {
      dispatch(setSelectedUser(user));
      console.log('dispatch', user)
    };
    
    const handleDelete = async (userId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        try {
          const response = await fetch(`${URL_API}users/${userId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            console.log('Usuario eliminado:', userId);
            // Actualizar el estado local eliminando el usuario de la lista
            setUsers(users.filter(user => user.id !== userId));
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
    
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email} 
              <Link onClick={() => handleClick(user)} to={`/users/${user.id}`} >
                <i className="bi bi-eye"></i>
              </Link>
              <button onClick={() => handleDelete(user.id)}>
                <i className="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserList;
  