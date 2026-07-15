import React, { useEffect, useState } from 'react'
import axiosClient from '../utils/axisoClient'
import { useNavigate } from 'react-router';

const MyExam = () => {

  const [enrollData, setEnrollData] = useState(null);

  const enrollMentData = async () => {
    const response = await axiosClient.get("/enroll/studentEnrollment");
    // console.log(response.data.data)
    setEnrollData(response.data.data);
  }

  

  useEffect(() => {
    enrollMentData();
  }, [])

  const navigate = useNavigate();

  return (
    <div>
      <h1>This is the seciton of the exam</h1>

      <div>
        {
          enrollData?.length > 0 ? <div>
            {
              enrollData?.map((data) => (
                <div key={data._id}>
                  <h1>{data.courseId.BatchName}</h1>
                  <h1>{data.courseId.className}</h1>

                  <button className='btn btn-primary' onClick={()=>navigate(`/exam/subject/${data._id}`)}>get Details</button>
                </div>
              ))
            }
          </div> : <div> Data not found </div>
        }
      </div>

    </div>
  )
}

export default MyExam