import React from 'react'
import { useParams } from 'react-router'

const ExamSub = () => {
    const {id} = useParams();
  return (
    <div>
        <h1>Here you will get all those exam related to the batch</h1>
        <h1>{id}</h1>
    </div>
  )
}

export default ExamSub