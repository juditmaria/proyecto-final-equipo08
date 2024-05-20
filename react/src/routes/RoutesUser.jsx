import React from 'react'

const RoutesUser = () => {
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

export default RoutesUser
