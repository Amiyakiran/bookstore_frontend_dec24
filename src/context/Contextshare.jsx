import React, { useState } from 'react'
import { createContext } from 'react'


export const searchKeyContext = createContext("")
export const adminProfileUpdateStatusContext = createContext("")
export const userProfileUpdateStatusContext = createContext("")


function Contextshare({children}) {
  const [searchkey, setsearchkey] = useState("")
  const [adminProfileUpdateStatus , setadminProfileUpdateStatus] = useState({})
  const [userProfileUpdateStatus , setuserProfileUpdateStatus] = useState({})
   

  return (
  <userProfileUpdateStatusContext.Provider value={{userProfileUpdateStatus , setuserProfileUpdateStatus}}>
     <adminProfileUpdateStatusContext.Provider value={{adminProfileUpdateStatus , setadminProfileUpdateStatus}}>
        <searchKeyContext.Provider value={{searchkey,setsearchkey}}>
            {
            children
            }
        </searchKeyContext.Provider>
     </adminProfileUpdateStatusContext.Provider>
  </userProfileUpdateStatusContext.Provider>
  )
}

export default Contextshare