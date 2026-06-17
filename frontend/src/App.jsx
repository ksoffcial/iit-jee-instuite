import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Home from './Pages/Home'
import Login from './Home/Login'
import Register from './Home/Register'
import { useDispatch, useSelector } from 'react-redux'
import { checkUser } from './authSlice'
import Courses from './Home/Courses'
import StudentResults from './Home/StudentResults'
import AdminPanel from './Pages/AdminPanel'
import AllUser from './Admin/AllUser'
import BatchDetails from './Admin/BatchDetails'
import CreateBatch from './Admin/CreateBatch'
import BatchUi from './Home/BatchUi'
import Footer from './Home/Footer'
import MakeAdmin from './Admin/MakeAdmin'
import TestSection from './Admin/TestSection'
import CreateTest from './Admin/CreateTest'
import DeleteTest from './Admin/DeleteTest'
import TestData from './Home/TestData'
import Navbar from './Home/Navbar'
import TestPanel from './Home/TestPanel'
import Jee from './Home/Jee'
import AiChat from './Home/AiChat'
import Mentordetails from './Admin/Mentordetails'
import GetMentor from './Admin/GetMentor'
import AddMentor from './Admin/AddMentor'
import Userquery from './Home/Userquery'
import Query from './Admin/Query'
import EnrollPage from './Pages/EnrollPage'
import UserProfile from './Pages/UserProfile'
import EnrollmentDetails from './Admin/EnrollmentDetails'
import EnrollmentBatch from './Admin/EnrollmentBatch'
import TotalEnrollment from './Admin/TotalEnrollment'
import TestResult from './Admin/TestResult'
import AttemptTest from './Home/AttemptTest '
import Result from './Admin/Result'
import MyExam from './Home/MyExam'
import MockTest from './Home/MockTest'
import TestDetails from './Home/TestDetails'




const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const userCheck = async () => {
      const response = await dispatch(checkUser());
      console.log("response for the check ", response)
    }
    userCheck();
  }, [dispatch])


  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  }


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path='/course' element={<><Navbar /> <Courses /> <BatchUi /> <Footer /></>} />
        <Route path='/result' element={<> <Navbar /> <StudentResults /> <Footer /></>} />
        <Route path='/testSection' element={<> <TestData /> </>} />
        <Route path='/jee' element={<Jee />} />
        <Route path='/admin' element={isAuthenticated && user.role == "admin" ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path='/admin/getAllUser' element={isAuthenticated && user.role == 'admin' ? <AllUser /> : <Navigate to="/" />} />
        <Route path='/admin/batchDetails' element={isAuthenticated && user.role == 'admin' ? <BatchDetails /> : <Navigate to='/' />} />
        <Route path='/admin/createBatch' element={isAuthenticated && user.role == 'admin' ? <CreateBatch /> : <Navigate to='/' />} />
        <Route path='/admin/createAdmin' element={isAuthenticated && user.role == 'admin' ? <MakeAdmin /> : <Navigate to='/' />} />
        <Route path='/admin/createTest' element={isAuthenticated && user.role == 'admin' ? <TestSection /> : <Navigate to='/' />} />
        <Route path='/admin/testResult' element={isAuthenticated && user.role == 'admin' ? <TestResult /> : <Navigate to='/' />} />
        <Route path='/admin/result/:id' element={isAuthenticated && user.role == 'admin' ? <Result /> : <Navigate to='/' />} />
        <Route path='/test/create' element={isAuthenticated && user.role == 'admin' ? <CreateTest /> : <Navigate to="/" />} />
        <Route path='/test/delete' element={isAuthenticated && user.role == 'admin' ? <DeleteTest /> : <Navigate to="/" />} />
        <Route path='/doubt' element={isAuthenticated ? <AiChat /> : <Login />} />
        <Route path='/admin/mentor' element={isAuthenticated && user.role == "admin" ? <Mentordetails /> : <Navigate to="/" />} />
        <Route path='/mentor/deletementor' element={isAuthenticated && user.role == "admin" ? <GetMentor /> : <Navigate to="/" />} />
        <Route path='/mentor/addmentor' element={isAuthenticated && user.role == "admin" ? <AddMentor /> : <Navigate to="/" />} />
        <Route path='/admin/query' element={isAuthenticated && user.role == "admin" ? <Query /> : <Navigate to="/" />} />
        <Route path='/admin/enrollment' element={isAuthenticated && user.role == "admin" ? <EnrollmentDetails/>: <Navigate to="/" />} />
        <Route path='/admin/totalenrollment' element={isAuthenticated && user.role == "admin" ? <TotalEnrollment/>: <Navigate to="/" />} />
        <Route path='/enrollment/details/:id' element={isAuthenticated && user.role == "admin" ? <EnrollmentBatch/>: <Navigate to="/" />} />
        <Route path='/query' element={<Userquery />} />
        <Route path='/courese/enroll/:id' element={isAuthenticated ? <EnrollPage /> : <Navigate to="/login" />} />
        <Route path='/user/myprofile' element={isAuthenticated ? <UserProfile/>:<Navigate to="/login"/>}/>
        <Route path='/test/myexam' element={isAuthenticated ? <MyExam/> : <Navigate to="/login"/>}/>
        <Route path='/test/mockTest' element={isAuthenticated ? <MockTest/> : <Navigate to="/login"/>}/>
        <Route path='/test/mock/:id' element={isAuthenticated ? <TestDetails/> : <Navigate to='/login'/>}/>
        <Route path='/test/Attempts/:id' element={isAuthenticated ? <AttemptTest/> : <Navigate to='/login'/>}/>
      </Routes>
    </div>
  )
}

export default App