import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to='/' className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-[#F83002] rounded-lg flex items-center justify-center'>
                <Briefcase size={15} className='text-white' />
              </div>
              <span className='text-xl font-bold text-white'>Job<span className='text-[#F83002]'>Portal</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Find the best jobs and career opportunities in one place. Your dream job is just a click away.
            </p>
            <div className="flex gap-3 mt-1">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-[#F83002] rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon size={14} className="text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <h4 className="text-white text-sm font-semibold mb-1">Explore</h4>
              {['Home', 'Jobs', 'Browse', 'Companies'].map(link => (
                <a key={link} href="#" className="text-sm hover:text-white hover:translate-x-1 transition-all duration-150">{link}</a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white text-sm font-semibold mb-1">Company</h4>
              {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
                <a key={link} href="#" className="text-sm hover:text-white hover:translate-x-1 transition-all duration-150">{link}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-7" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-2">
          <p>© {new Date().getFullYear()} <span className="text-gray-400">JobPortal</span>. All rights reserved.</p>
          <p>Made with <span className="text-[#F83002]">❤️</span> by <span className="text-gray-400 font-medium">Nikhil</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer