import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='m-4'>
      <Button className='m-2'><Link to="/users">Users</Link></Button>
      <Button className='m-2'><Link to="/promoters">Promoters</Link></Button>
      <Button className='m-2'><Link to="/locations-admin">Locations</Link></Button>
      <Button className='m-2'><Link to="/movies-admin">Movies</Link></Button>

    </div>
  )
}

export default Admin