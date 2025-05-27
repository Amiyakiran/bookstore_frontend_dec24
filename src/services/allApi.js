import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register - content-type = application/json
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)
}

//login 
export const LoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

//google login api 
export const googleLoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/google-login`, reqBody)
}

//get home book 
export const homeBookApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-home-book`)
}

//get all jobs
export const getAllJobsApi = async (searchKey) => {
    return await commonApi('GET', `${serverUrl}/all-jobs?search=${searchKey}`)
}


//---------------------------------------------------------------------------------------------
//                                               USERS

//upload a book
export const uploadBookApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-book`, reqBody, reqHeader)
}


//get all books 
export const getAllBookApi = async (searchkey, reqHeader) => {
    //query parameter baseurl?key=value
    return await commonApi('GET', `${serverUrl}/all-books?search=${searchkey}`, '', reqHeader)
}

//api to view a book 
export const viewABookApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/view-book/${id}`)
}

//api to add application
export const addApplicationApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/apply-job`, reqBody, reqHeader)
}

//api to update the user profile

export const updateUserProfileApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/user-profile-update`, reqBody, reqHeader)
}


//api to get all user books
export const getAllUserBookApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/user-books`, "", reqHeader)
}

//api to get all user brought books
export const getAllUserBroughtBookApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/user-brought-books`, "", reqHeader)
}

//api to get delete a user books
export const deleteAUserBookApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/delete-user-books/${id}`)

}
//api to make payment 
export const makePaymentApi = async(reqBody , reqHeader)=>{
 return await commonApi('PUT', `${serverUrl}/make-payment`, reqBody, reqHeader)
}
//----------------------------------------------------------------------------------------------
//                                               ADMIN

//api to get all book - admin 
export const getAllBookAdminApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/admin-all-books`, "", reqHeader)
}


//api to approve a book 
export const approveBookApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/approve-book`, reqBody, reqHeader)
}

//api to get all users
export const getAllUsersApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-users`, "", reqHeader)
}

//api to add all jobs 
export const addJobApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/add-job`, reqBody)
}

//api to delete a job 
export const deleteJobApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/delete-job/${id}`)
}

//api to get all applications

export const getAllApplicationsApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-application`)
}


//api to update the profile

export const updateProfileApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/admin-profile-update`, reqBody, reqHeader)
}