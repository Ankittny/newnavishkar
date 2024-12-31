import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import WorkshopDetails from '@/components/pages/workshop/WorkshopDetails'
import React from 'react'

const page = ({params}) => {
  console.log("params slug", params);
  return (
    <div>
        <Navbar/>
        <WorkshopDetails params={params}/>
        <Footer/>
    </div>
  )
}

export default page