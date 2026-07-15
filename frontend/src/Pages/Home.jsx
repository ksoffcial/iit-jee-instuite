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
import Member from '../Home/Member'
import OurGallery from '../Home/OurGallery'
import AiVideo from '../Home/AiVideo'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AiVideo/>
      <div >
        <Courses />
      </div>
      {/* <div className='block md:hidden'>
        <CourseCarousel />
      </div> */}
      <BatchUi />
      <WhyChooseUs />
      <OurGallery/>
      <Member/>
      {/* <Mentor /> */}
      <StudentResults />
      <Feedback />
      <Footer />

    </div>
  )
}

export default Home