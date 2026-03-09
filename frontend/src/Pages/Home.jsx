import React from 'react'
import Navbar from '../Home/Navbar'
import Hero from '../Home/Hero'
import Courses from '../Home/Courses'
import Mentor from '../Home/Mentor'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Courses/>
        <Mentor/>
    </div>
  )
}

export default Home