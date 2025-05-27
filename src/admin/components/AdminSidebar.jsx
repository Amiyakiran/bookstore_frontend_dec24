import { faBagShopping, faBook, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../context/Contextshare'



function AdminSidebar() {
    const [HomeStatus, setHomeStatus] = useState(false)
    const [BooksStatus, setBooksStatus] = useState(false)
    const [CareerStatus, setCareerStatus] = useState(false)
    const [SettingStatus, setSettingStatus] = useState(false)
    const [adminD, setadminD] = useState({
        username:"",
        profile:""
    })


    const navigate = useNavigate()
    const {adminProfileUpdateStatus} = useContext(adminProfileUpdateStatusContext)

    const filter = (data)=>{
            if (data == 'home'){
                navigate('/admin-home')
            }
            else if (data == 'books'){
                navigate('/admin-books')
            }
            else if(data == 'careers'){
                navigate('/admin-careers')
            }
            else if(data == 'setting'){
                navigate('/admin-settings')
            }
            else{
                navigate('*')
            }
    }

    useEffect(()=>{

        // console.log(location.pathname);
        if(location.pathname == '/admin-home'){
            setHomeStatus(true)
        }
        else if(location.pathname=='/admin-books'){
            setBooksStatus(true)
        }
        else if(location.pathname == '/admin-careers'){
            setCareerStatus(true)
        }
        else if(location.pathname == '/admin-settings'){
            setSettingStatus(true)
        }
        else{
            console.log('no such page');
            
        }
        
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setadminD({username:user.username , profile:user.profile})

    },[adminProfileUpdateStatus])

    return (
        <>
            <img src={adminD.profile==""?"https://cdn-icons-png.flaticon.com/512/9187/9187604.png":`${serverUrl}/upload/${adminD.profile}`} alt="no image" style={{ width: '150px', height: '150px', borderRadius:'50%' }} />

            <h1 className='mt-5'>{adminD.username}</h1>

            <div className="my-5">
                <div className="mb-3"  onClick={()=>filter('home')}>
                    <input type="radio" id='home' name='filter' readOnly checked={HomeStatus} />
                    <label htmlFor="home" className='ms-3'><FontAwesomeIcon icon={faHouse} className='me-3' />Home</label>
                </div>
                <div className="mb-3" onClick={()=>filter('books')}>
                    <input type="radio" id='allbooks' name='filter' readOnly checked={BooksStatus} />
                    <label htmlFor="allbooks" className='ms-3' > <FontAwesomeIcon icon={faBook} className='me-3' />All Books</label>
                </div>
                <div className="mb-3" onClick={()=>filter('careers')}>
                    <input type="radio" id='careers' name='filter' readOnly checked={CareerStatus}/>
                    <label htmlFor="careers" className='ms-3' ><FontAwesomeIcon icon={faBagShopping} className='me-3' />Careers</label>
                </div>
                <div className="mb-3"  onClick={()=>filter('setting')}>
                    <input type="radio" id='settings' name='filter' readOnly checked={SettingStatus} />
                    <label htmlFor="settings" className='ms-3'><FontAwesomeIcon icon={faGear} className='me-3' />settings</label>
                </div>
            </div>

        </>
    )
}

export default AdminSidebar