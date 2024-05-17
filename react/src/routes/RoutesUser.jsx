import React from 'react'

const RoutesUser = () => {
  return (
    <div>RoutesUser</div>
    <Route path="/" element={<LocationList />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies/:id" element={<MovieShow />} />
            <Route path="/:id" element={<PassesList />} />
            <Route path="/:id/passes/:movieid" element={<PassesShow />} />
  )
}

export default RoutesUser
