import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getAllBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/Contextshare'


function AllBooks() {
    const [status, setStatus] = useState(false)
    const [token, setToken] = useState("")
    const [allBooks, setAllBooks] = useState([])
    const [tempArray, setTempArray] = useState([])
    const {searchkey , setsearchkey} = useContext(searchKeyContext)

    console.log(searchkey);
    
    const getAllBooks = async (searchkey, tok) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        }

        const result = await getAllBookApi(searchkey ,reqHeader)
        //console.log(result);
        if (result.status == 200) {
            setAllBooks(result.data)
            setTempArray(result.data)
        }


    }

    console.log(allBooks);

    const filter = (data) => {
        if (data == 'no-filter') {
            setAllBooks(tempArray)
        }
        else {
            setAllBooks(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
        }

    }


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
            getAllBooks(searchkey ,tok)
        }

    }, [searchkey])


    return (
        <>
            <Header />

            {/* when the user is logged in */}
            {token && <div>

                <div className='flex justify-center items-center flex-col'>
                    <h1 className='mt-5 text-3xl font-medium'>Collections</h1>
                    <div className="flex my-8 w-full justify-center items-center">
                        <input type="text" value={searchkey} onChange={(e)=>setsearchkey(e.target.value)} placeholder='Search By Title' className='border border-gray-200 placeholder-gray-200 p-2 md:w-1/4 w-1/2' />
                        <button className='bg-blue-900 text-white py-2 px-3 shadow hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>search</button>
                    </div>
                </div>

                <div className="md:grid grid-cols-[1fr_4fr] md:py-10 md:px-20 p-5">
                    <div>
                        <div className='flex my-3 justify-between'>
                            <h1 className='text-2xl font-medium '>Filters</h1>
                            <span className='md:hidden' onClick={() => setStatus(!status)}><FontAwesomeIcon icon={faBars} /></span>
                        </div>
                        <div className={status ? 'md:block' : 'md:block justify-center hidden'}>

                            <div className='mt-3' onClick={() => filter('Literary')}>
                                <input type="radio" id='Literary' name='filter' />
                                <label htmlFor="Literary" className='ms-3'>Literary Fiction</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Philosophy')}>
                                <input type="radio" id='Philosophy' name='filter' />
                                <label htmlFor="Philosophy" className='ms-3'>Philosophy</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Thriller')}>
                                <input type="radio" id='Thriller' name='filter' />
                                <label htmlFor="Thriller" className='ms-3'>Thriller</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Romance')}>
                                <input type="radio" id='Romance' name='filter' />
                                <label htmlFor="Romance" className='ms-3'>Romance</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Horror')}>
                                <input type="radio" id='Horror' name='filter' />
                                <label htmlFor="Horror" className='ms-3'>Horror</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Auto/Biography')}>
                                <input type="radio" id='Auto/Biography' name='filter' />
                                <label htmlFor="Auto/Biography" className='ms-3'>Auto/Biography</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Self-Help')}>
                                <input type="radio" id='Self-Help' name='filter' />
                                <label htmlFor="Self-Help" className='ms-3'>Self-Help</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('Politics')}>
                                <input type="radio" id='Politics' name='filter' />
                                <label htmlFor="Politics" className='ms-3'>Politics</label>
                            </div>
                            <div className='mt-3' onClick={() => filter('no-filter')}>
                                <input type="radio" id='no-filter' name='filter' />
                                <label htmlFor="no-filter" className='ms-3'>No-filter</label>
                            </div>
                        </div>

                    </div>
                    <div className="md:grid grid-cols-4 w-full">
                        {
                            allBooks?.length > 0 ?
                                allBooks?.map((item) => (
                                    <div className='p-3' hidden={item?.status == 'pending' || item?.status == 'sold'}>
                                        <div className='p-3 shadow-md'>
                                            <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} />
                                            <div className='flex justify-center flex-col items-center mt-3'>
                                                <p className='text-blue-700'> {item?.author.slice(0, 20)}...</p>
                                                <h3>{item?.title.slice(0, 20)}...</h3>
                                                <Link to={`/view-books/${item?._id}`} className='w-full'><button className=' w-full mt-3 px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'> view Book </button></Link>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <p>No Books</p>
                        }

                    </div>
                </div>

            </div>}

            {/* not logged in */}

            {!token && <div className="grid grid-cols-3 py-10">
                <div></div>
                <div className='flex justify-center items-center flex-col w-full'>
                    <img src="https://cdn-icons-gif.flaticon.com/11255/11255957.gif" alt="no image" className='w-1/2' />
                    <p className='mt-3 text-2xl'>Please<Link to={'/login'} className='text-red-500 underline'> Login</Link> To Explore More</p>
                </div>
                <div></div>
            </div>}





            <Footer />

        </>
    )
}

export default AllBooks