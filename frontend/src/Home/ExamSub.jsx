import React from 'react'
import { useParams } from 'react-router'
import axiosClient from '../utils/axisoClient';
import { useEffect } from 'react';
import { useState } from 'react';

const ExamSub = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState([]);

  const getData = async () => {
    const response = await axiosClient.get(`/enroll/studentEnrollById/${id}`);
    console.log(response.data.data);
    setTestData(response.data.data);
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <div>
      <h1>Here you will get all those exam related to the batch</h1>
      <h1>{id}</h1>
      <div>
        {
          testData &&
          testData?.courseId?.subjects?.map((data) => (
            <div key={data._id}>
              <h2>{data?.subjectName}</h2>
              <h2>{data?.teacherName}</h2>
              <button>Start Test</button>
            </div>
          ))


        }
      </div>
    </div>
  )
}

export default ExamSub