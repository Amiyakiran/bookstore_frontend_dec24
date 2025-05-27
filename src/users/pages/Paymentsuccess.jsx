import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

function Paymentsuccess() {
  return (
   <>
   <Header/>
        <div className='container my-10' >
    
            <div className="md:grid grid-cols-2 px-20 justify-center items-center flex-col">
                <div>
                    <h1 className='md:text-4xl text-blue-800'>Congratulations</h1>
                    <p className='my-4 text-2xl'>Thankyou for shopping with Bookstore. Hope ypu have a good time with us</p>
                    <Link to={'/all-Books'}><button className='bg-blue-800 px-4 py-3 text-white my-5 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800'> <FontAwesomeIcon icon={faBackward} className='me-2' /> Explore More books</button></Link>
                </div>
                <div className='flex justify-center items-center'>
                    <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="no image" className='w-full' />
                </div>
            </div>
            
        </div>
        <Footer/>
   </>
  )
}

export default Paymentsuccess