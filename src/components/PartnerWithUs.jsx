import React from 'react'
import ProductBanner from './ProductBanner'
import Image from 'next/image'

const PartnerWithUs = () => {
  return (
    <>
       <ProductBanner imageUrl={'/product/productDetailBanner.png'} />

       <div className="partners-title">
        <div className="container">
            <div class="partner-heading text-center">
                <h1>Partner with Us</h1>
            </div>
            <div className="classic-partner-title d-flex">
              <div className="partner">
                <Image src={'/PWS/pwu1.png'} height={100} width={100} alt='pws' />
              </div>
              <div className="partner-other-int">
               <h2>Partner with Us</h2>
               <p>Are you ready to embark on an educational journey that challenges orthodox ways and 
                embraces innovations? Navishkar invites you to join us in revolutionising the education 
                industry. With a dedication to providing a comprehensive educational solution where creativity knows no bounds, we offer a transformative experience for schools looking to cultivate students who can Imagine and Innovate.</p>
              </div>
              
            </div> 
        </div>
    </div>
    </>
  )
}

export default PartnerWithUs