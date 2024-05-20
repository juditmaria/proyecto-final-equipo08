import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL_API } from '../../../../constants';
import { setPromoterId, setPromoterName, setPromoterImg } from '../../../../slices/promoter/promoterSlice';
import { useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PromoterList = () => {
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPromoters = async () => {
      try {
        const response = await fetch(URL_API + 'promoters');
        if (response.ok) {
          const data = await response.json();
          setPromoters(data.data);
        } else {
          console.error('Error fetching promoters:', response.statusText);
          setError('Error fetching promoters');
        }
      } catch (error) {
        console.error('Error fetching promoters:', error);
        setError('Error fetching promoters');
      } finally {
        setLoading(false);
      }
    };

    fetchPromoters();
  }, []);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="text-center my-5">Error: {error}</div>;

  const handleClick = (promoter) => {
    dispatch(setPromoterId(promoter.id));
    dispatch(setPromoterName(promoter.name));
    dispatch(setPromoterImg(promoter.image));
  };
  
  const handleDelete = async (promoterId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this promoter?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${URL_API}promoters/${promoterId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setPromoters(promoters.filter(promoter => promoter.id !== promoterId));
        } else {
          console.error('Error deleting promoter:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting promoter:', error);
      }
    }
  };
  
  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Promoters</h1>
      <ul className="list-unstyled">
        {promoters.map(promoter => (
          <li key={promoter.id} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
            <div>
              <strong>{promoter.name}</strong>
              <div>
                <img src={promoter.image} alt={promoter.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            </div>
            <div>
              <Link
                onClick={() => handleClick(promoter)}
                to={`/promoters/${promoter.id}`}
                className="btn btn-primary btn-sm me-2"
                title="View"
              >
                <i className="bi bi-eye"></i>
              </Link>
              <Link
                onClick={() => handleClick(promoter)}
                to={`/promoters/${promoter.id}/update`}
                className="btn btn-secondary btn-sm me-2"
                title="Edit"
              >
                <i className="bi bi-pen"></i>
              </Link>
              <Button
                onClick={() => handleDelete(promoter.id)}
                variant="danger"
                size="sm"
                title="Delete"
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default PromoterList;
