import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TermsCondition from '@/components/pages/termsCondition/TermsCondition'
import React from 'react'


const page = () => {
  return (
    <div>
        <Navbar/>
        <TermsCondition />
        <Footer/>
    </div>
  )
}

export default page