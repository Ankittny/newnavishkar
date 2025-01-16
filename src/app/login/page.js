import Login from '@/components/auth/Login'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'


export const metadata ={
  title:'Login Page'
}
const page = () => {

  return (
    <>
    <Navbar/>
    <Login/>
    <Footer/>
    </>
  )
}

export default page