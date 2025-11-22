import React from 'react'
import { Link } from 'react-router-dom'

const Community = () => {
    return (
        <div className='flex flex-col justify-center items-center my-16 gap-6'>
            <h1 className='font-bold text-3xl'>Ready to Share Your Project?</h1>
            <p className='text-xl text-gray-700'>Join our community of innovators and showcase your work to the world</p>
            <Link
                to="/submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-md mt-2"
            >
                Submit Your Project
            </Link>
        </div>
    )
}

export default Community
