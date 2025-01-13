import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PrivacyPolicy from '@/components/pages/privacyPolicy/PrivacyPolicy'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <PrivacyPolicy />
        <Footer />
    </div>
  )
}

export default page