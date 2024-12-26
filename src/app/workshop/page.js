import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Workshop from '@/components/pages/workshop/Workshop'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <Workshop />
        <Footer/>
    </div>
  )
}

export default page