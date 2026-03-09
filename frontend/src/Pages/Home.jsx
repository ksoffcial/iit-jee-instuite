import React from 'react'
import Navbar from '../Home/Navbar'
import Hero from '../Home/Hero'
import Courses from '../Home/Courses'
import Mentor from '../Home/Mentor'
import Feedback from '../Home/Feedback'
import WhyChooseUs from '../Home/WhyChooseUs'
import StudentResults from '../Home/StudentResults'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Courses/>
        <WhyChooseUs/>
        <Mentor/>
        <StudentResults/>
        <Feedback/>
    </div>
  )
}

export default Home