import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LocationList from '../components/app/LocationList';
import About from '../components/app/About';
import MovieShow from '../components/app/MovieShow';
import PassesList from '../components/app/PassesList';
import PassesShow from '../components/app/PassesShow';
import Terms from '../components/app/Terms';
import NotFound from '../components/app/NotFound';

const RoutesGuest = () => {
  return (
    <div>
        <Layout>
            <Routes>
                <Route path="/" element={<LocationList />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/about" element={<About />} />
                <Route path="/movies/:id" element={<MovieShow />} />
                <Route path="/:id" element={<PassesList />} />
                <Route path="/:id/passes/:movieid" element={<PassesShow />} />
            </Routes>
        </Layout>
    </div>
  )
}

export default RoutesGuest