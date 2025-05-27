import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../context/Contextshare'


function AdminSettings() {

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  })
  console.log(adminDetails);
  const [preview, setPreview] = useState("")
  const [token, settoken] = useState("")
  const [existingProfileImage, setexistingProfileImage] = useState("")
  const [updateStatus, setupdateStatus] = useState({})
  const {setadminProfileUpdateStatus} = useContext(adminProfileUpdateStatusContext)

  const handleFileAdd = (e) => {
    //console.log(e.target.files[0]);
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    //console.log(adminDetails.profile);

    if (e.target.files[0] != "") {
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url);

    }

  }
  console.log(preview);

  //reset function 
  const handleReset = () => {

    if (sessionStorage.getItem("token")) {
      // const token = sessionStorage.getItem("token")
      // settoken(token)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setexistingProfileImage(user.profile)
    }
    setPreview("")
  }

  //function to update
  const handleAdd = async () => {
    const { username, password, cPassword, profile } = adminDetails
    console.log(username, password, cPassword, profile);

    if (!username || !password || !cPassword) {
      toast.info('Please add complete details')
    }
    else {

              if (password != cPassword) {
                toast.warning('password must match')
              }
              else {

                        if (preview) {
                          const reqBody = new FormData()

                          for (let key in adminDetails) {
                            reqBody.append(key, adminDetails[key])
                          }

                          const reqHeader = {
                            "Authorization": `Bearer ${token}`
                          }

                          const result = await updateProfileApi(reqBody, reqHeader)
                          console.log(result);
                            if(result.status == 200){
                              toast.success('Profile updated successfully')
                              sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                              setupdateStatus(result.data)
                              setadminProfileUpdateStatus(result.data)
                            }
                            else{
                              toast.error('Something went wrong')
                              setupdateStatus(result)
                            }

                        }
                        else {
                          const reqHeader = {
                            "Authorization": `Bearer ${token}`
                          }

                          const result = await updateProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
                          console.log(result);
                          if(result.status == 200){
                              toast.success('Profile updated successfully')
                              sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                              setupdateStatus(result.data)
                              setadminProfileUpdateStatus(result.data)
                            }
                            else{
                              toast.error('Something went wrong')
                              setupdateStatus(result)
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
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setexistingProfileImage(user.profile)
    }
  }, [updateStatus])


  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]' style={{ marginTop: '-5px' }}>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div className='mb-10'>
          <h1 className='my-5 text-center text-2xl'>Settings</h1>
          <div className="md:grid grid-cols-2 justify-center items-center">
            <div className='md:px-10 px-5'>
              <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis?</p>
              <p className='mt-4 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis, consequatur quos eveniet inventore ipsam beatae iure fugiat eligendi quae laborum incidunt eum quis, est blanditiis exercitationem velit excepturi?</p>
            </div>

            <div className='md:px-10 px-5 mt-5 md:mt-0'>
              <form className='shadow rounded bg-blue-200 md:p-10 p-5 flex justify-center items-center flex-col'>
                <label htmlFor="AdminProfilefile" style={{ marginBottom: '50px', }}>
                  <input id='AdminProfilefile' type="file" style={{ display: 'none' }} onChange={(e) => handleFileAdd(e)} />

                  {existingProfileImage == "" ? <img src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} /> :

                    <img src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`} alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}


                  <FontAwesomeIcon icon={faPen} className='bg-yellow-300  text-white py-3 px-4 rounded' style={{ marginLeft: '90px', marginTop: '-100px' }} />

                </label>

                <div className="mb-3 w-full">
                  <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full bg-white' />
                </div>
                <div className="mb-3 w-full">
                  <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full bg-white' />
                </div>
                <div className="mb-3 w-full">
                  <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" placeholder='Conform Password' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full bg-white' />
                </div>

                <div className="mb-3 w-full flex">
                  <button type='button' onClick={handleReset} className='w-1/2 bg-amber-600 text-white hover:text-amber-600 hover:border hover:border-amber-600 rounded hover:bg-white p-3'>Reset</button>
                  <button type='button' onClick={handleAdd} className='w-1/2 ms-4 bg-green-600 text-white hover:text-green-600 hover:border hover:border-green-600 rounded hover:bg-white p-3'>Update</button>
                </div>

              </form>
            </div>
          </div>


        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminSettings