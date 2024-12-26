import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CompleteProject from '@/components/pages/completeProject/CompleteProject'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <CompleteProject />
      <Footer />
    </div>
  )
}

export default page