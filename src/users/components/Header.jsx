import { faInstagram, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { userProfileUpdateStatusContext } from '../../context/Contextshare'





function Header() {
  const [status, setStatus] = useState(false)
  const [dropdownStatus, setdropdownStatus] = useState(false)
  const [token , setToken] = useState("")
  const [dp, setdp] = useState("")
  const {userProfileUpdateStatus} = useContext(userProfileUpdateStatusContext)
  //console.log(token);

  const handleLogout = ()=>{
      sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate('/')
  }
  
  useEffect(()=>{

   if(sessionStorage.getItem("token")){
    const token  = sessionStorage.getItem("token")
    setToken(token)
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setdp(user.profile)
   }

  },[userProfileUpdateStatus])

  return (
    <>
      <div className='md:grid grid-cols-3 p-3'>
        <div className='flex items-center'>
          <img src="https://openclipart.org/image/800px/svg_to_png/275692/1489798288.png" alt="logo" style={{ width: '50px', height: '50px' }} />
          <h1 className='text-2xl md:hidden ms-2 font-bold'>BOOK STORE</h1>
        </div>
        <div className='md:flex justify-center items-center hidden'>
          <h1 className='text-3xl font-bold'>BOOK STORE</h1>
        </div>
        <div className='md:flex justify-end items-center hidden'>
          <FontAwesomeIcon icon={faInstagram} className='me-3' />
          <FontAwesomeIcon icon={faXTwitter} className='me-3' />
          <FontAwesomeIcon icon={faFacebook} className='me-3' />

         {!token? <Link to={'/login'}> <button className='border border-black rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>

          :
         
          <div className="relative inline-block text-left">
            <div>
              <button onClick={() => setdropdownStatus(!dropdownStatus)} type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <img src={dp==""?"https://cdn-icons-png.flaticon.com/512/149/149071.png":dp.startsWith('https://lh3.googleusercontent.com')?dp:`${serverUrl}/upload/${dp}`} alt="user icon" style={{ width: '40px', height: '40px', borderRadius:'50%' }} className='mx-2' />
              </button>
            </div>

            {dropdownStatus && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">

                <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' /> Profile</p></Link>
                <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

              </div>
            </div>}



          </div>}

        </div>

      </div>

      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center items-center'>
        <div className='flex justify-between items-center px-3 md:hidden'>
          <span onClick={() => setStatus(!status)} className='text-2xl'> <FontAwesomeIcon icon={faBars} /></span>

         {!token ? <Link to={'/login'}>  <button className='border border-white rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>


                :

         <div className="relative inline-block text-left">
            <div>
              <button onClick={()=>setdropdownStatus(!dropdownStatus)} type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon" style={{ width: '40px', height: '40px' }} className='mx-2' />
              </button>
            </div>

            {dropdownStatus &&<div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
               
                <Link to={'/profile'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' /> Profile</p></Link>
                <button type="button" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
               
              </div>
            </div>}


            
          </div> }





        </div>
        <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to={'/'}><li className='mx-4 mt-3 md:mt-0'>Home</li></Link>
          <Link to={'/all-Books'}> <li className='mx-4  mt-3 md:mt-0'>Books</li></Link>
          <Link to={'/careers'}><li className='mx-4  mt-3 md:mt-0'>Careers</li></Link>
          <Link to={'/contact'}> <li className='mx-4  mt-3 md:mt-0'>Contact</li></Link>
        </ul>
      </nav>

    </>
  )
}

export default Header
