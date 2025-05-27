import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'

function Paymenterror() {
  return (
    <>
         <Header/>
            <div className='container my-10' >
        
                <div className="md:grid grid-cols-2 px-20 justify-center items-center flex-col">
                    <div>
                        <h1 className='md:text-4xl text-red-600'>Sorry ! Your Payment is UnSuccessfull</h1>
                        <p className='my-4 text-2xl'>We Apologize for the inconvience caused and appreciate your visit to bookstore.</p>
                        <Link to={'/all-Books'}><button className='bg-blue-800 px-4 py-3 text-white my-5 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800'> <FontAwesomeIcon icon={faBackward} className='me-2' /> Explore More books</button></Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://easyfashion.com.bd/wp-content/uploads/2021/04/payment-failed-min.gif" alt="no image" className='w-full' />
                    </div>
                </div>
                
            </div>
            <Footer/>
    </>
  )
}

export default Paymenterror