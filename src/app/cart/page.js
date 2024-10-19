import React from 'react';
import CartComponent from "../../components/pages/carComponent/CartComponent"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  return (
    <>
        <Navbar />
        <CartComponent/>
        <Footer/>
    </>
  )
}

export default Cart