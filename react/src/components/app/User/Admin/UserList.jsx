import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setSelectedUser } from '../../../../slices/user/userSlice';
import { useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="text-center my-5">Error: {error}</div>;

  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
  };
  
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}users/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Users</h1>
      <ul className="list-unstyled">
        {users.map(user => (
          <li key={user.id} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div>
              <Link
                onClick={() => handleClick(user)}
                to={`/users/${user.id}`}
                className="btn btn-primary btn-sm me-2"
                title="View"
              >
                <i className="bi bi-eye"></i>
              </Link>
              <Link
                onClick={() => handleClick(user)}
                to={`/users/${user.id}/update`}
                className="btn btn-secondary btn-sm me-2"
                title="Edit"
              >
                <i className="bi bi-pen"></i>
              </Link>
              <Button
                onClick={() => handleDelete(user.id)}
                variant="danger"
                size="sm"
                title="Delete"
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </li>
        ))}
        <Link to={`/users/create`} className="btn btn-success btn-sm mt-3">
          Crear Nuevo Usuario
        </Link>
      </ul>
    </Container>
  );
};

export default UserList;
