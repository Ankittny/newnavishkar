import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Innovation from '@/components/pages/innovation/Innovation'
import React from 'react'


const page = () => {
  return (
    <div>
      <Navbar/>
      <Innovation/>
      <Footer/>
    </div>
  )
}

export default page