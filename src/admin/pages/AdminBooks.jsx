import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookApi, getAllBookAdminApi, getAllUsersApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { serverUrl } from '../../services/serverUrl'

function AdminBooks() {
  const [bookStatus, setbookStatus] = useState(true)
  const [userStatus, setuserStatus] = useState(false)
  const [bookdetails, setBookDetails] = useState([])
  const [token, setToken] = useState("")
  const [approveStatus, setApproveStatus] = useState(false)
  const [allusers, setallusers] = useState([])


  const getAllBookAdmin = async (token) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getAllBookAdminApi(reqHeader)
    //console.log(result);
    if (result.status == 200) {
      setBookDetails(result.data)
    }

  }

  // console.log(bookdetails);


  const approveBook = async (data) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await approveBookApi(data, reqHeader)
    console.log(result);
    if (result.status == 200) {
      setApproveStatus(!approveStatus)
    }
    else {
      toast.error('Something went wrong')
    }

  }


  //function to get all users
  const getAllUsers = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUsersApi(reqHeader)
    console.log(result);
    if(result.status == 200){
      setallusers(result.data)
    }

  }


  useEffect(() => {
   
    if (sessionStorage.getItem("token")) {
       const token = sessionStorage.getItem("token")
       setToken(token)
      if (bookStatus == true) {
       
        getAllBookAdmin(token)
      }
      else if (userStatus == true) {
        getAllUsers(token)
      }
      else{
        console.log('something went wrong');
        
      }

    }

  }, [approveStatus, userStatus])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]' style={{marginTop:'-5px'}}>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-center text-2xl my-4'>All Books</h1>
          <div className='md:px-40'>
            {/* tab */}
            <div className='flex justify-center items-center my-8'>
              <p onClick={() => { setbookStatus(true); setuserStatus(false) }} className={bookStatus ? 'p-3 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-3 text-black border-b border-gray-200 cursor-pointer'}>Book List</p>


              <p onClick={() => { setbookStatus(false); setuserStatus(true) }} className={userStatus ? 'p-3 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-3 text-black border-b border-gray-200 cursor-pointer'} >Users</p>



            </div>
          </div>

          {bookStatus && <div className="md:grid grid-cols-4 w-full mt-5 px-10">
            {bookdetails?.length > 0 ?
              bookdetails?.map((item, index) => (
                <div className='p-3' key={index}>
                  <div className={item.status == 'sold' ? 'p-3 shadow-md opacity-58' : 'p-3 shadow-md'}>
                    <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} />
                    <div className='flex justify-center flex-col items-center mt-3'>
                      <p className='text-blue-700'>{item?.author.slice(0, 20)}...</p>
                      <h3>{item?.title.slice(0, 20)}...</h3>
                      <p className='text-blue-600'>${item?.dprice}</p>
                      {item?.status == 'pending' && <button onClick={() => approveBook(item)} className='bg-green-800 text-white p-2 w-full hover:border hover:border-green-800 hover:text-green-800 hover:bg-white'>Approve</button>}

                      {item?.status == 'approved' &&
                        <div className='flex justify-end w-full'>
                          <img src="https://static.vecteezy.com/system/resources/thumbnails/019/465/852/small_2x/tick-mark-icon-symbol-on-transparent-background-free-png.png" alt="approved" style={{ width: '40px', height: '40px' }} /></div>
                      }
                    </div>
                  </div>
                </div>
              )) :
              <p>No books</p>
            }

          </div>}

          {userStatus && <div className='md:grid grid-cols-3 p-10'>

           {allusers?.length>0? 
             allusers?.map((user , index)=>(
              <div className='bg-gray-100 p-4 rounded md:m-4 mt-4' key={index}>
              <p className='text-red-700'>ID : {user?._id}</p>
              <div className="grid grid-cols-[1fr_2fr] mt-3">
                <div className='flex justify-center items-center'>
                  <img src={user?.profile==""?"https://cdn-icons-png.freepik.com/512/8742/8742495.png": user?.profile.startsWith('https://lh3.googleusercontent.com')?user.profile: `${serverUrl}/upload/${user?.profile}`} alt="no image" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
                </div>
                <div>
                  <p className='text-blue-700'>{user?.username}</p>
                  <p style={{fontSize:'12px'}} className='text-orange-600'>{user?.email}</p>
                </div>
              </div>
            </div>
             ))
           
           :
            <p>No users</p>
            }

           
          </div>}
        </div>
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminBooks