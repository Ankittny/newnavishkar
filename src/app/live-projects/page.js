import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import LiveProjects from '@/components/pages/liveProjects/LiveProjects'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <LiveProjects />
      <Footer />
    </div>
  )
}

export default page