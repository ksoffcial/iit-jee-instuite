import React from 'react'
import Navbar from '../Home/Navbar'
import Hero from '../Home/Hero'
import Courses from '../Home/Courses'
import Mentor from '../Home/Mentor'
import Feedback from '../Home/Feedback'
import WhyChooseUs from '../Home/WhyChooseUs'
import StudentResults from '../Home/StudentResults'
import Footer from '../Home/Footer'
import BatchUi from '../Home/BatchUi'
import CourseCarousel from '../Home/Coursecarousel'

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className='text-7xl font-bold bg-white mt-40'>some updated testing </h1>
      <Hero />
      <div className='hidden md:block'>
        <Courses />
      </div>
      <div className='block md:hidden'>
        <CourseCarousel />
      </div>
      <BatchUi />
      <WhyChooseUs />
      <Mentor />
      <StudentResults />
      <Feedback />
      <Footer />

    </div>
  )
}

export default Home