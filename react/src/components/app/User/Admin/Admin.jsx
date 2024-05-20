import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Button><Link to="/users">Users</Link></Button>
      <Button><Link to="/promoters">Promoters</Link></Button>
      <Button><Link to="/locations-admin">Locations</Link></Button>
      <Button><Link to="/movies-admin">Movies</Link></Button>

    </div>
  )
}

export default Admin