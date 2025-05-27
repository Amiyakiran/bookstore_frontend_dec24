import { faInstagram , faXTwitter, faFacebook, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'




function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 bg-gray-900 md:p-10 p-5 text-white'>
        <div>
          <h4>ABOUT US</h4>
          <p className='mt-4 text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo itaque necessitatibus quas nobis, illum voluptate, pariatur recusandae alias harum!</p>
        </div>
        <div className='md:flex justify-center'>
         <div className='mt-4 md:mt-5'>
            <h4>NEWSLETTER</h4>
            <p className='mt-4 text-justify'>Stay updated with our latest trends</p>
            <div className="flex mt-3">
              <input type="text" placeholder='Email ID' className='bg-white placeholder-gray-600 p-2' />
              <button className='bg-yellow-300 py-2 px-3'><FontAwesomeIcon icon={faArrowRight} className='text-black' /></button>
            </div>
         </div>
        </div>
        <div className='mt-5 md:mt-0'>
          <h4>FOLLOW US</h4>
          <p className='mt-4'>Let us be social</p>
          <div className='flex mt-3'>
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} className='ms-3' />
          <FontAwesomeIcon icon={faFacebook} className='ms-3' />
          <FontAwesomeIcon icon={faLinkedin} className='ms-3' />
          </div>
        </div>
      </div>
      <div className='bg-black p-3 flex justify-center items-center text-white'>
        <h6 style={{ fontSize: '10px' }} className='text-center'>Copyright © 2023 All rights reserved | This website is made with by  <FontAwesomeIcon icon={faHeart} className='text-yellow-400' />   Amiya kiran</h6>
      </div>
    </>
  )
}

export default Footer