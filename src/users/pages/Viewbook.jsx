import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCamera, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { makePaymentApi, viewABookApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify'

function Viewbook() {
  const [modalStatus, setModalStatus] = useState(false)
  const [viewBookDetails, setViewBookDetails] = useState({})
  const [token, settoken] = useState("")
  const { id } = useParams()
  //console.log(id);


  const viewABook = async (id) => {
    const result = await viewABookApi(id)
    // console.log(result);
    if (result.status == 200) {
      setViewBookDetails(result.data)
    }

  }
  console.log(viewBookDetails);

  //function to make payment 
  const makePayment = async () => {
    console.log(viewBookDetails);
    //object-instance
    const stripe = await loadStripe('pk_test_51RPc3kFV25RbWaaJe0mM30nVoUmabL8LV5OfXhAfGuWqAXrudLtJ99XLBkQ5cWrpwMbxIBEO2nqIlI47evDmQGGb00RAAXXIV7');
    //data to update in backend
    const reqBody = {
      booksDetails: viewBookDetails
    }
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await makePaymentApi(reqBody, reqHeader)
    console.log(result);
    // console.log(result.data.existingBook);
    

    const sessionId = result.data.sessionId
 
    const response = stripe.redirectToCheckout({
      sessionId:sessionId
    })
    if(response.error){
      toast.error('Something went wrong')
    }
    

  }

  useEffect(() => {
    viewABook(id)
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      settoken(token)
    }
  }, [])

  return (
    <>
      <Header />
      <div className='md:p-20 p-5' >
        <div className=' md:p-10 p-5 shadow w-full'>
          <div className='flex justify-end mb-5 md:mb-0'>
            <FontAwesomeIcon icon={faEye} className='text-gray-500' onClick={() => setModalStatus(true)} />
          </div>
          <div className="md:grid grid-cols-[1fr_3fr] w-full overflow-x-hidden">
            <div>
              <img src={viewBookDetails.imageurl} alt="no image" style={{ width: '100%', height: '400px' }} />
            </div>
            <div className='px-4 mt-5 md:mt-0'>
              <h1 className='text-center font-medium text-2xl'>{viewBookDetails?.title}</h1>
              <p className='text-blue-500 text-center mt-3 md:mt-0'>- {viewBookDetails?.author}</p>


              <div className="md:flex justify-between mt-10">
                <p>Publisher : {viewBookDetails?.publisher}  </p>
                <p className='mt-3 md:mt-0'>Language : {viewBookDetails?.language}    </p>
                <p className='mt-3 md:mt-0'>No. of pages : {viewBookDetails?.noofpages}</p>
              </div>
              <div className="md:flex justify-between mt-3">
                <p>Seller Mail : {viewBookDetails?.userMail} </p>
                <p className='mt-3 md:mt-0'>Real Price : $ {viewBookDetails?.price}    </p>
                <p className='mt-3 md:mt-0'>  ISBN : {viewBookDetails?.isbn}</p>
              </div>
              <p className='text-justify mt-10'>
                {viewBookDetails?.abstract}</p>
              <div className='mt-10 flex justify-end'>
                <Link to={'/all-Books'}> <button className='px-4 py-3 bg-blue-800 rounded text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800'><FontAwesomeIcon className='me-2' icon={faBackward} />Back</button></Link>
                <button type='button' onClick={makePayment} className=' ms-3 px-4 py-3 bg-green-800 rounded text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800'>Buy $ {viewBookDetails?.dprice}</button>
              </div>
            </div>
          </div>
        </div>
      </div>



      {modalStatus && <div onClick={() => setModalStatus(false)} className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              <div className='bg-gray-900 p-3 text-white flex justify-between'>
                <h3>Book Photos</h3>
                <FontAwesomeIcon icon={faXmark} onClick={() => setModalStatus(false)} />
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p className='text-blue-500'><FontAwesomeIcon icon={faCamera} className='me-3' />Camera click of the book in the hand of seller</p>

                <div className='md:flex my-4'>
                  {
                    viewBookDetails?.uploadedImg.map((item) => (
                      <img className='mt-4 mx-5' src={`${serverUrl}/upload/${item}`} alt="no image" style={{ width: '300px', height: '300px' }} />
                    ))
                  }

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>}
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </>
  )
}

export default Viewbook