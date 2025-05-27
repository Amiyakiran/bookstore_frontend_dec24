import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/Contextshare'
import { toast, ToastContainer } from 'react-toastify'


function Home() {

  const [homeBook , setHomeBook] = useState([])
  const {searchkey , setsearchkey} = useContext(searchKeyContext)
  const navigate = useNavigate()

  const getAllHomeBook = async()=>{
    const result = await homeBookApi()
   // console.log(result);
    if(result.status == 200){
      setHomeBook(result.data)
    }
    
  }

 // console.log(homeBook);

 const handleSearch = ()=>{
  console.log('inside handleSearch');
  const token = sessionStorage.getItem("token")
  
   if(searchkey == ""){
     toast.info('Please enter the title of the book')
   }
   else if (!token){
     toast.info('Please login')
       setTimeout(()=>{
         navigate('/login')
       },2500)
   }
   else if (searchkey && token){
    navigate('/all-Books')
   }
   else{
    toast.error('Something went wrong')
   }
 }
  
  useEffect(()=>{
    setsearchkey("")
    getAllHomeBook()
  },[])

  return (
    <>
      <Header />

      <header className='flex justify-center items-center'>
        <div id="main" className='flex justify-center items-center w-full'>
          <div className="md:grid grid-cols-3 w-full">
            <div></div>
            <div className='text-white flex justify-center items-center flex-col px-5'>
              <h1 className='text-5xl'>Wonderful Gifts</h1>
              <p>Give your family and friends a book</p>

              <div className="flex mt-10 w-full">
                <input type="text" placeholder='Search Books' className='py-2 px-4 bg-white rounded-3xl  placeholder-gray-400 w-full text-black ' onChange={(e)=>setsearchkey(e.target.value)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-blue-800' style={{ marginTop: '11px', marginLeft: '-30px' }} onClick={handleSearch} />
              </div>
            </div>
            <div></div>

          </div>
        </div>
      </header>


      {/* new arrival */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h2>NEW ARRIVALS</h2>
        <h4 className='text-2xl'>Explore Our Latest Collection</h4>

        <div className="md:grid grid-cols-4 w-full mt-5">
         {
          homeBook?.length>0?
          homeBook?.map((item)=>(
             <div className='p-3'>
            <div className='p-3 shadow-md'>
              <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} />
              <div className='flex justify-center flex-col items-center mt-3'>
                <p className='text-blue-700'>{item?.author.slice(0,20)}...</p>
                <h3>{item?.title.slice(0,20)}...</h3>
                <p>$ {item.dprice}</p>
              </div>
            </div>
          </div>
          )) :
          <p>Loading....</p>
         }
         
        </div>


        <div className="flex justify-center items-center my-5">
          <Link to={'/all-Books'}><button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
        </div>

      </section >


      {/* author */}

      <section  className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>

        <div className="md:grid grid-cols-2 w-full">
          <div >
           <div className='flex justify-center items-center flex-col'>
              <h4>FEATURED AUTHORS</h4>
              <h3 className='text-2xl' >Captivates with every word</h3>
           </div>
           <p className='mt-6 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga nostrum illum distinctio eum quidem recusandae soluta aliquam laboriosam odit quas, nam molestias fugiat culpa rem nulla iste? Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt earum possimus accusantium necessitatibus id neque soluta quibusdam explicabo laborum? Deserunt vel quia voluptates dicta incidunt illo fuga pariatur sequi error.</p>
           <p className='mt-5 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga nostrum illum distinctio eum quidem recusandae soluta aliquam laboriosam odit quas, nam molestias fugiat culpa rem nulla iste? Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt earum possimus accusantium necessitatibus id neque soluta quibusdam explicabo laborum? Deserunt vel quia voluptates dicta incidunt illo fuga pariatur sequi error.</p>
          </div>

          <div className='px-10 pt-8'>
            <img src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg" alt="no image" className='w-full' />
          </div>

        </div>

      </section>


      {/* testimonial */}

      <div className='flex justify-center items-center flex-col md:py-10 md:px-40 p-6'>
        <h3>TESTIMONIALS</h3>
        <h3 className='text-2xl'>See What Others Are Saying</h3>

        <img src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="no image" style={{width:'150px', height:'150px', borderRadius:'50%'}} className='mt-5' />
        <h6 className='mt-3'>Treesa Joseph</h6>
        <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore perspiciatis porro eveniet. Optio necessitatibus provident autem, quam qui, dicta molestiae quis quia deleniti aliquam magnam temporibus mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, deserunt optio eum dolorum iure consectetur quia facilis porro modi placeat ea quis explicabo maxime voluptatum unde animi nemo aperiam quos!</p>


      </div>


     

     <ToastContainer position='top-center' theme='colored' autoClose={2000} />

      <Footer />
    </>
  )
}

export default Home