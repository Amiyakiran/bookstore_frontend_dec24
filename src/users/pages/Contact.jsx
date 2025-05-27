import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope ,faPaperPlane } from '@fortawesome/free-solid-svg-icons'


function Contact() {
    return (
        <>
            <Header />
            <div className='flex justify-center items-center flex-col md:px-40 px-10'>
                <h1 className='my-5 text-3xl font-medium'>Contacts</h1>
                <p className='md:text-center text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio inventore placeat nemo voluptatem iure, iste asperiores quia amet sint, similique corrupti praesentium delectus nesciunt odit laudantium. Beatae repudiandae amet odit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, doloremque ullam itaque atque totam quasi molestias cumque ducimus fuga voluptate suscipit vel distinctio omnis voluptates obcaecati quidem quas iure? Facere?</p>
            </div>

            <div className='md:grid grid-cols-3 md:px-40 my-10 px-20 '>
                <div className='flex items-center md:justify-center'>
                    <div className="flex justify-center items-center bg-gray-200 text-gray-900" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <p className='ms-3 mt-2'>123 Main Street, Apt 4B, <br /> Anytown, CA 91234</p>
                </div>
                <div className='flex items-center md:justify-center mt-5 md:mt-0'>
                    <div className="flex justify-center items-center bg-gray-200 text-gray-900" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                        <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <p className='ms-3 mt-3'> +91 9874561230</p>
                </div>
                <div className='flex items-center md:justify-center  mt-5 md:mt-0'>
                    <div className="flex justify-center items-center bg-gray-200 text-gray-900" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <p className='ms-3 mt-3'>Bookstore@gmail.com</p>
                </div>
            </div>

            <div className='md:grid grid-cols-2 md:px-60 px-5 my-5'>
                <div>
                    <form className='p-4 shadow bg-gray-200'>
                        <h4 className='text-center mb-4 text-gray-900 font-medium'>Send me Message</h4>
                        <div className="mb-3">
                            <input type="text" placeholder='Name' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' />


                        </div>
                        <div className="mb-3">
                            <textarea name="" id="" className='p-2 rounded placeholder-gray-600 bg-white w-full' placeholder='Message' rows={6} ></textarea>
                        </div>
                        <div className="mb-3">
                            <button className=' bg-gray-900 text-white p-3 w-full'>Send<FontAwesomeIcon icon={faPaperPlane} className="ms-3" /></button>
                        </div>
                    </form>
                </div>
                <div className='mt-5 md:mt-0 md:px-10 '>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.55832720318!2d76.30948101195872!3d10.008813464713272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1745418349896!5m2!1sen!2sin" width="100%" height="415" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Contact