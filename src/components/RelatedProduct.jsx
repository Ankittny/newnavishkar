import Image from 'next/image';
import React from 'react';
// import related1 from "../../assets/labs/summer1.png";
import Link from 'next/link';
 

const RelatedProduct = () => {
  return (
     <>
    <div className='ReletedslideContainer'>
      <div className='card'>
        <Image className='cardImgTop' src={'/labs/summer1.png'} width={100} height={100} alt="Card image cap" />
        <div className='cardBody'>
          <h5 className='cardTitle'>Navishkar</h5>
          <p className='cardText'>
            Explore the latest trends in our summer collection. Be fashion-ready!
          </p>
          <button className='btnPrimary'>
          <Link href="#" className='button '>
            Add to Card
          </Link>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RelatedProduct;
