import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Payment from '@/components/pages/carComponent/Payments'
import React from 'react'

const PaymentComponent = () => {
  return (
    <div>
        <Navbar/>
        <Payment/>
        <Footer />
    </div>
  )
}

export default PaymentComponent