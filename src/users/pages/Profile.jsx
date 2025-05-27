import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { deleteAUserBookApi, getAllUserBookApi, getAllUserBroughtBookApi, uploadBookApi } from '../../services/allApi'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'
import { serverUrl } from '../../services/serverUrl'


function Profile() {
    const [sellstatus, setsellstatus] = useState(true)
    const [bookstatus, setbookstatus] = useState(false)
    const [purchaseStatus, setpurchaseStatus] = useState(false)
    const [bookDetails, setBookDetails] = useState({

        title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "",
        uploadedImages: []
    })
    const [preview, setpreview] = useState("")
    const [previewList, setpreviewList] = useState([])
    const [token, setToken] = useState("")
    const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)
    const [dp, setdp] = useState("")
    const [username, setusername] = useState("")
    const [userBook, setuserBook] = useState([])
    const [userBroughtBook, setuserBroughtBook] = useState([])
    const [deleteStatus, setdeleteStatus] = useState("")
    //  console.log(bookDetails);


    const [isOpen, setIsOpen] = useState(false);

    const handleUpload = (e) => {
        console.log(e.target.files[0]);

        const fileArray = bookDetails.uploadedImages
        fileArray.push(e.target.files[0])
        setBookDetails({ ...bookDetails, uploadedImages: fileArray })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);

        setpreview(url)

        const newArray = previewList
        newArray.push(url)
        setpreviewList(newArray)

    }

    const handleReset = () => {
        setBookDetails({
            title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "",
            uploadedImages: []
        })
        setpreview("")
        setpreviewList([])
    }

    const handleSubmit = async () => {
        const { title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadedImages } = bookDetails

        if (!title || !author || !noofpages || !imageurl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || uploadedImages.length == 0) {
            toast.info('Please will the fields completely')
        }
        else {

            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const reqBody = new FormData()

            for (let key in bookDetails) {
                if (key != 'uploadedImages') {
                    reqBody.append(key, bookDetails[key])
                }
                else {
                    bookDetails.uploadedImages.forEach((item) => {
                        reqBody.append("uploadedImages", item)
                    })
                }
            }

            const result = await uploadBookApi(reqBody, reqHeader)
            console.log(result);

            if (result.status == 401) {
                toast.warning(result.response.data)
                handleReset()
            }
            else if (result.status == 200) {
                toast.success('Book Added sucessfully')
                handleReset()
            }
            else {
                toast.error('Something went wrong')
                handleReset()
            }





        }
    }


    const getallUserBook = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUserBookApi(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setuserBook(result.data)
        }

    }

    const getallUserBroughtBook = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUserBroughtBookApi(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setuserBroughtBook(result.data)
        }

    }

    const deleteBook = async(id)=>{
     const result = await deleteAUserBookApi(id)
     console.log(result);
     if(result.status == 200){
        setdeleteStatus(result.data)
     }

     
    }


    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setdp(user.profile)
            setusername(user.username)
        }

    }, [userProfileUpdateStatus])

    useEffect(() => {
        if (bookstatus == true) {
            getallUserBook()
        }
        else if (purchaseStatus == true) {
            getallUserBroughtBook()
        }
        else {
            console.log('Something went wrong')
        }

    }, [bookstatus ,deleteStatus])


    return (
        <>
            <Header />
            <div style={{ height: '200px' }} className='bg-gray-900'></div>
            <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }} className='bg-white p-3'>
                <img src={dp == "" ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : dp.startsWith('https://lh3.googleusercontent.com') ? dp : `${serverUrl}/upload/${dp}`} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            </div>
            <div className="md:flex justify-between px-20 mt-5">
                <p className='flex justify-center items-center'>
                    <span className='md:text-3xl text-2xl'>{username} </span>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-blue-400 ms-3 mt-2' />
                </p>
                <EditProfile />
            </div>
            <p className='md:px-20 px-5 my-5 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum dignissimos nam voluptas, architecto totam voluptatem qui consequatur explicabo asperiores illum dolorem non sequi ipsam vero! Dolore cum aliquid amet recusandae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse culpa ratione a voluptates natus magni eius consequuntur velit sint commodi ipsum fuga nulla, dignissimos officiis aut cum quos dolore alias.</p>

            <div className='md:px-40'>
                {/* tab */}
                <div className='flex justify-center items-center my-5'>
                    <p onClick={() => { setsellstatus(true); setbookstatus(false); setpurchaseStatus(false) }} className={sellstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Sell Book</p>


                    <p onClick={() => { setsellstatus(false); setbookstatus(true); setpurchaseStatus(false) }} className={bookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'} >Book status</p>


                    <p onClick={() => { setsellstatus(false); setbookstatus(false); setpurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Purchase History</p>
                </div>


                {/* content */}

                {sellstatus &&
                    <div className='bg-gray-200 p-10 my-20 mx-5'>

                        <h1 className='text-center text-3xl font-medium'>Book Details</h1>
                        <div className="md:grid grid-cols-2 mt-10 w-full">
                            <div className='px-3'>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.title} placeholder='Title' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.author} placeholder='Author' className='p-2 bg-white rounded placeholder-gray-300 w-full'
                                        onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.noofpages} placeholder='No of Pages' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.imageurl} placeholder='Image url' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, imageurl: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.price} placeholder='Price' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.dprice} placeholder='discount price' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <textarea rows={5} value={bookDetails.abstract} placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} ></textarea>
                                </div>
                            </div>
                            <div className='px-3'>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.publisher} placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.language} placeholder='Language' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.isbn} placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={bookDetails.category} placeholder='Category' className='p-2 bg-white rounded placeholder-gray-300 w-full' onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} />
                                </div>

                                <div className="mb-3 flex justify-center items-center w-full mt-10">
                                    {!preview ? <label htmlFor="imagefile">
                                        <input id='imagefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="no image" style={{ width: '200px', height: '200px' }} />
                                    </label> :
                                        <img src={preview} alt="no image" style={{ width: '200px', height: '200px' }} />
                                    }

                                </div>

                                {preview && <div className='flex justify-center items-center'>
                                    {previewList?.map((item) => (
                                        <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className='mx-3' />
                                    ))}
                                    {previewList.length < 3 && <label htmlFor="imagefile">
                                        <input id='imagefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-gray-500' />
                                    </label>}

                                </div>
                                }
                            </div>
                        </div>
                        <div className='flex md:justify-end justify-center mt-8'>
                            <button onClick={handleReset} className='bg-amber-600 rounde text-black p-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>
                            <button onClick={handleSubmit} className='bg-green-600 rounde text-white p-3 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ms-4'>Submit</button>
                        </div>

                    </div>}


                {bookstatus &&
                    <div className='p-10 my-20 shadow rounded'>

                        {userBook?.length > 0 ?
                            userBook?.map((item) => (
                                <div className='bg-gray-200 p-5 rounded mt-4'>
                                    <div className="md:grid grid-cols-[3fr_1fr]">
                                        <div className='px-4'>
                                            <h1 className='text-2xl'>{item?.title}</h1>
                                            <h2>{item?.author}</h2>
                                            <h3 className='text-blue-600'>$ {item?.dprice}</h3>
                                            <p>{item?.abstract}</p>
                                            <div className='flex'>
                                                {item?.status == 'pending' ? <img src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="no image" style={{ width: '70px', height: '70px' }} />
                                                    : item?.status == 'approved' ?
                                                        <img src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="no image" style={{ width: '70px', height: '70px' }} />
                                                        :
                                                        <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="no image" style={{ width: '70px', height: '70px' }} />
                                                }
                                            </div>
                                        </div>
                                        <div className='px-4 mt-4 md:mt-4'>
                                            <img src={item?.imageurl} alt="no image" className='w-full' style={{ height: '250px' }} />
                                            <div className='flex justify-end mt-4'>
                                                <button onClick={()=>deleteBook(item?._id)} className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))

                            :
                            <div className='flex justify-center items-center flex-col'>
                                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                                <p className='text-red-600 text-2xl'>No Book Added Yet</p>
                            </div>}

                    </div>}


                {purchaseStatus &&
                    <div className='p-10 my-20 shadow rounded'>

                        {userBroughtBook?.length > 0 ?
                            userBroughtBook?.map((item) => (
                                <div className='bg-gray-200 p-5 rounded mt-4'>
                                    <div className="md:grid grid-cols-[3fr_1fr]">
                                        <div className='px-4'>
                                            <h1 className='text-2xl'>{item?.title}</h1>
                                            <h2>{item?.author}</h2>
                                            <h3 className='text-blue-600'>$ {item?.dprice}</h3>
                                            <p>{item?.abstract}</p>
                                            <div className='flex'>
                                                {item?.status == 'pending' ? <img src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="no image" style={{ width: '70px', height: '70px' }} />
                                                    : item?.status == 'approved' ?
                                                        <img src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="no image" style={{ width: '70px', height: '70px' }} />
                                                        :
                                                        <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="no image" style={{ width: '70px', height: '70px' }} />
                                                }
                                            </div>
                                        </div>
                                        <div className='px-4 mt-4 md:mt-4'>
                                            <img src={item?.imageurl} alt="no image" className='w-full' style={{ height: '250px' }} />
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className='flex justify-center items-center flex-col'>
                                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '200px', height: '200px' }} />
                                <p className='text-red-600 text-2xl'>No Book Purchased Yet</p>
                            </div>}

                    </div>
                }



            </div>






            <ToastContainer theme='colored' position='top-center' autoClose={2000} />

            <Footer />

        </>
    )
}

export default Profile