import React from 'react'
import { useSelector } from 'react-redux';

const Promoter = () => {
    const promoterName = useSelector(state => state.auth.promoterName);

  return (
    <>
      <div>Profile Promoter</div>
      <div>{promoterName}</div>
    </>
  )
}

export default Promoter