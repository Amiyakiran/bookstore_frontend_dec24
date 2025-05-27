import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState , useContext} from 'react'
import { serverUrl } from '../../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { updateUserProfileApi } from '../../services/allApi'
import {userProfileUpdateStatusContext} from '../../context/Contextshare'

function EditProfile() {

  const [offcanavasStatus, setOffCanavasStatus] = useState(false)

  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    profile: ""
  })
  const [existingImage, setexistingImage] = useState("")
  const [preview, setpreview] = useState("")
  const [token, settoken] = useState("")
  //console.log(userDetails);
 const {setuserProfileUpdateStatus} = useContext(userProfileUpdateStatusContext)
 
  const handleUpload = (e) => {
    setuserDetails({ ...userDetails, profile: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setpreview(url)
  }


  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setuserDetails({ username: user.username, password: user.password, cpassword: user.password, bio: user.bio })
    setexistingImage(user.profile)
    setpreview("")
  }


  const handleUpdate = async () => {
    const { username, password, cpassword, bio, profile } = userDetails
    if (!username || !password || !cpassword || !bio) {
      toast.info('Please add All Details')
    }
    else {
      if (password != cpassword) {
        toast.warning('Password and confirm password must match')
      }
      else {
        if (preview) {
          const reqBody = new FormData()
          for (let key in userDetails) {
            reqBody.append(key, userDetails[key])
          }
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateUserProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('profile updated successfully')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            handleReset()
            setOffCanavasStatus(false)
            setuserProfileUpdateStatus(result.data)
          }
          else {
            toast.error('something went wrong')
            handleReset()
          }

        }
        else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await updateUserProfileApi({ username, password, profile, bio }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            toast.success('profile updated successfully')
            handleReset()
            setOffCanavasStatus(false)
             setuserProfileUpdateStatus(result.data)
          }
          else {
            toast.error('something went wrong')
            handleReset()
          }

        }
      }
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      settoken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setuserDetails({ username: user.username, password: user.password, cpassword: user.password, bio: user.bio })
      setexistingImage(user.profile)
    }
  }, [])

  return (
    <>
      <div className='flex justify-end mt-5 md:mt-0'>
        <button onClick={() => setOffCanavasStatus(true)} className='text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white'> <FontAwesomeIcon icon={faPenToSquare} /> Edit </button>
      </div>



      {offcanavasStatus &&
        <div>
          <div className='fixed inset-0 bg-gray-500/75 transition-opacity w-full h-full' onClick={() => setOffCanavasStatus(false)}></div>

          <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
            <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
              <h1>Edit User Profile</h1>
              <FontAwesomeIcon onClick={() => setOffCanavasStatus(false)} icon={faXmark} />
            </div>
            <div className='flex justify-center items-center flex-col my-5'>
              <label htmlFor="Profilefile">
                <input id='Profilefile' type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                {existingImage == "" ?

                  <img className='z-52' src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />

                  : existingImage.startsWith('https://lh3.googleusercontent.com') ?
                    <img className='z-52' src={preview ? preview : existingImage} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                    :
                    <img className='z-52' src={preview ? preview : `${serverUrl}/upload/${existingImage}`} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                }
                <div className='bg-yellow-300 z-53 fixed text-white py-3 px-4 rounded' style={{ marginLeft: '135px', marginTop: '-50px' }}><FontAwesomeIcon icon={faPen} /></div>
              </label>

              <div className="mb-3 mt-10 w-full px-5">
                <input value={userDetails.username} onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
              </div>
              <div className="mb-3 w-full px-5">
                <input type="text" value={userDetails.password} onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} placeholder='Password' className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
              </div>
              <div className="mb-3 w-full px-5">
                <input value={userDetails.cpassword} onChange={(e) => setuserDetails({ ...userDetails, cpassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
              </div>
              <div className="mb-3 w-full px-5">
                <textarea value={userDetails.bio} onChange={(e) => setuserDetails({ ...userDetails, bio: e.target.value })} placeholder='Bio' rows={5} className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded'></textarea>
              </div>

              <div className='flex justify-end w-full px-5 mt-5'>
                <button onClick={handleReset} className='bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600 hover:border hover:border-amber-600 hover:bg-white'>Reset</button>

                <button onClick={handleUpdate} className='bg-green-600 text-white rounded py-3 px-4 hover:text-green-600 hover:border hover:border-green-600 hover:bg-white ms-4'>Update</button>
              </div>
            </div>
          </div>
          <ToastContainer theme="colored" position="top-center" autoClose={2000} />
        </div>}


    </>
  )
}

export default EditProfile