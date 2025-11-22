import { Heart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="w-full bg-[#0B1220] text-gray-300 py-6 px-16">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">

                {/* Left Text */}
                <p className='text-gray-400'>© 2025 Powerfolio. All rights reserved.</p>

                {/* Logo Center */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={assets.logo}
                            alt="Powerfolio Logo"
                            className="w-35 object-contain"
                        />
                    </div>
                </Link>

                {/* Right Text */}
                <div className="flex items-center gap-1 text-gray-400">
                    <span>Made with</span>
                    <Heart size={18} color="red" fill="red" className="inline-block" />
                    <span>for student innovation</span>
                </div>

            </div>
        </footer>
    )
}

export default Footer
