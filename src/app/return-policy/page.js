import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ReturnPolicy from '@/components/pages/returnPolicy/ReturnPolicy'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <ReturnPolicy />
      <Footer/>
    </div>
  )
}

export default page