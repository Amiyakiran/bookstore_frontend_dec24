import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addJobApi, deleteJobApi, getAllApplicationsApi, getAllJobsApi } from '../../services/allApi'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'


function AdminCareers() {
  const [jobStatus, setjobStatus] = useState(true)
  const [applicantStatus, setapplicantStatus] = useState(false)
  const [modalstatus, setmodalstatus] = useState(false)
  const [addJobStatus, setaddJobStatus] = useState({})
  const [searchKey, setsearchKey] = useState("")
  const [deleteJobStatus, setdeleteJobStatus] = useState({})
  const [jobdetails, setJobDetails] = useState({
    title: "", location: "", jType: "", salary: "", qualication: "", experience: "", description: ""
  })

  const [allJobs, setAllJobs] = useState([])
  const [allApplication, setallApplication] = useState([])

  // console.log(allJobs);


  //  console.log(jobdetails);

  const handlereset = () => {
    setJobDetails({
      title: "", location: "", jType: "", salary: "", qualication: "", experience: "", description: ""
    })
  }

  //add job
  const handleAdd = async () => {
    const { title, location, jType, salary, qualication, experience, description } = jobdetails

    if (!title || !location || !jType || !salary || !qualication || !experience || !description) {
      toast.info('Please fill the field completely')
    }
    else {
      const result = await addJobApi({ title, location, jType, salary, qualication, experience, description })
      console.log(result);
      if (result.status == 200) {
        toast.success('Job added successfully')
        handlereset()
        setmodalstatus(false)
        setaddJobStatus(result.data)

      }
      else if (result.status == 400) {
        toast.warning(result.response.data)
        handlereset()
      }
      else {
        toast.error('Something went wrong')
        handlereset()
      }

    }
  }

  //get job
  const getAllJobs = async (searchKey) => {
    const result = await getAllJobsApi(searchKey)
    //console.log(result);
    if (result.status == 200) {
      setAllJobs(result.data)
    }

  }

  //delete job 
  const deleteJob = async (id) => {
    const result = await deleteJobApi(id)
    console.log(result);
    if (result.status == 200) {
      setdeleteJobStatus(result)
    }

  }


  //get all applications
  const getAllApplication = async () => {
    console.log('etAllApplication');
    
    const result = await getAllApplicationsApi()
   // console.log(result);
    
    if (result.status == 200) {
      setallApplication(result.data)
    }
  }
  console.log(allApplication);

  useEffect(() => {
    if(jobStatus == true){
      getAllJobs(searchKey)
    }
    else if( applicantStatus == true){
      getAllApplication()
    }
    else{
      console.log('Something went wrong');
      
    }
  }, [addJobStatus, searchKey, deleteJobStatus ,applicantStatus])


  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]' style={{ marginTop: '-5px' }}>
        <div className='bg-blue-100 flex flex-col items-center p-5'>
          <AdminSidebar />
        </div>
        <div>
          <h1 className='text-center text-2xl my-4'>Careers</h1>


          <div className='md:px-40'>
            {/* tab */}
            <div className='flex justify-center items-center my-8'>
              <p onClick={() => { setjobStatus(true); setapplicantStatus(false) }} className={jobStatus ? 'p-3 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-3 text-black border-b border-gray-200 cursor-pointer'}>Job Post</p>


              <p onClick={() => { setjobStatus(false); setapplicantStatus(true) }} className={applicantStatus ? 'p-3 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-3 text-black border-b border-gray-200 cursor-pointer'} >View Applicant</p>



            </div>
          </div>

          {jobStatus &&

            <div>

              <div className='md:flex justify-center item-center  my-8 w-full md:px-20 px-5'>
                <div className="md:flex w-full ms-2 md:ms-0">
                  <input type="text" value={searchKey} onChange={(e) => setsearchKey(e.target.value)} placeholder='Search By Title' className='border border-gray-200 placeholder-gray-200 p-2 md:w-1/4 w-3/4' />
                  <button className='bg-blue-900 text-white py-2 px-3 shadow hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>search</button>
                </div>
                <div>
                  <button onClick={() => setmodalstatus(true)} className='bg-green-800 mt-5 md:mt-0 w-full  text-white p-2 rounded md:ms-3 hover:bg-white hover:border hover:border-green-800 hover:text-green-800'>Add Job + </button>
                </div>
              </div>



              <div className='md:px-20 py-5 px-3'>
                {allJobs?.length > 0 ?
                  allJobs?.map((items, index) => (
                    <div className='shadow border border-gray-200 mt-4' key={index}>


                      <div className="md:grid grid-cols-[8fr_1fr] p-5">
                        <div>
                          <h1 className='mb-3 text-xl font-semibold'>{items?.title}</h1>
                          <hr />
                          <p className='mt-3 text-blue-600'><FontAwesomeIcon icon={faLocationDot} className=' me-3' />{items?.location}</p>
                          <p className='mt-3 '>Job Type : {items?.jType}</p>
                          <p className='mt-3 '>Salary : {items?.salary}</p>
                          <p className='mt-3 '>Qualification : {items?.qualication} </p>
                          <p className='mt-3 '>Experience :  {items?.experience} </p>
                          <p className='text-justify'>Description :  {items?.description}</p>
                        </div>
                        <div className='flex md:justify-center items-start  justify-end'>
                          <button onClick={() => deleteJob(items?._id)} className='bg-red-800 mt-5 md:mt-0  text-white p-3 rounded ms-3 hover:bg-white hover:border hover:border-red-800 hover:text-red-800'>Delete <FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                      </div>

                    </div>
                  )) :
                  <p>No Job Added</p>
                }
              </div>


            </div>
          }


          {modalstatus && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {/* title */}
                  <div className="bg-gray-900 p-4 flex  sm:px-6 justify-between">
                    <h1 className='text-white text-2xl'>Application form</h1>
                    <FontAwesomeIcon onClick={() => setmodalstatus(false)} icon={faXmark} className='text-white fa-2x' />
                  </div>

                  {/* body */}
                  <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-3">
                      <input type="text" value={jobdetails.title} onChange={(e) => setJobDetails({ ...jobdetails, title: e.target.value })} placeholder='Job Title' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={jobdetails.location} onChange={(e) => setJobDetails({ ...jobdetails, location: e.target.value })} placeholder='Location' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={jobdetails.jType} onChange={(e) => setJobDetails({ ...jobdetails, jType: e.target.value })} placeholder='Job Type' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={jobdetails.salary} onChange={(e) => setJobDetails({ ...jobdetails, salary: e.target.value })} placeholder='Salary' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={jobdetails.qualication} onChange={(e) => setJobDetails({ ...jobdetails, qualication: e.target.value })} placeholder='Qualification' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className="mb-3">
                      <input type="text" value={jobdetails.experience} onChange={(e) => setJobDetails({ ...jobdetails, experience: e.target.value })} placeholder='Experience' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>
                    <div className="mb-3">
                      <textarea value={jobdetails.description} onChange={(e) => setJobDetails({ ...jobdetails, description: e.target.value })} type="text" placeholder='Description' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                    </div>

                  </div>
                  {/* footer of modal */}
                  <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={handleAdd} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-300">Add</button>
                    <button onClick={handlereset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black">Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>}



          {applicantStatus && <div className='p-10 overflow-x-auto'>
           {allApplication?.length>0? <table className='w-full my-3 shadow'>
              <thead>
                <tr>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Sl</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Job Title</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Name</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Qualification</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Email</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Phone</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Cover letter</th>
                  <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Resume</th>
                </tr>
              </thead>
              <tbody>

              { allApplication?.map((item , index)=>(
                 <tr  key={index}>
                  <td className='border border-gray-500 p-2'>{index+1}</td>
                  <td className='border border-gray-500 p-2'>{item?.jobtitle}</td>
                  <td className='border border-gray-500 p-2'>{item?.fullname}</td>
                  <td className='border border-gray-500 p-2'>{item?.qualification}</td>
                  <td className='border border-gray-500 p-2'>{item?.email}</td>
                  <td className='border border-gray-500 p-2'>{item?.phone}</td>
                  <td className='border border-gray-500 p-2'>{item?.coverletter}</td>
                  <td className='border border-gray-500 p-2'><Link to={`${serverUrl}/pdfUploads/${item?.resume}`} target='_blank' className='text-blue-600 underline'>resume</Link></td>
                </tr>
              )) }
              </tbody>

            </table>:
            <p>No application Yet..</p>
            }
          </div>}
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminCareers