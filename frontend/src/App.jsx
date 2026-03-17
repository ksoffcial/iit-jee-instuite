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
        <Route path='/course' element={<><Courses /> <BatchUi/> <Footer/></>} />
        <Route path='/result' element={<StudentResults />} />
        <Route path='/admin' element={isAuthenticated && user.role == "admin" ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path='/admin/getAllUser' element={isAuthenticated && user.role == 'admin' ? <AllUser /> : <Navigate to="/" />} />
        <Route path='/admin/batchDetails' element={isAuthenticated && user.role == 'admin' ? <BatchDetails/> : <Navigate to='/'/> }/>
        <Route path='/admin/createBatch' element={isAuthenticated && user.role == 'admin' ? <CreateBatch/> : <Navigate to='/'/> }/>
      </Routes>
    </div>
  )
}

export default App