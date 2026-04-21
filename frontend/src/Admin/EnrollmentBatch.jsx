import React from 'react'
import { useParams } from 'react-router'

const EnrollmentBatch = () => {
    const params = useParams();
  
  return (
    <div>EnrollmentBatch :- {params.id}</div>
  )
}

export default EnrollmentBatch