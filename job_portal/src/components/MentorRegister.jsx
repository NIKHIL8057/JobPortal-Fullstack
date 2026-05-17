import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Navbar'
import { MENTOR_API_END_POINT } from '@/utils/constants'

const MentorRegister = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        skills: '',
        experience: '',
        bio: '',
        zoomLink: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const skillsArray = form.skills.split(',').map(s => s.trim())

            const res = await axios.post(`${MENTOR_API_END_POINT}/register`, {
                ...form,
                skills: skillsArray
            }, { withCredentials: true })

            if (res.data.success) {
                toast.success("Mentor registered successfully!")
                navigate('/mentor')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 py-10'>
                <h1 className='text-3xl font-bold mb-2'>Become a Mentor</h1>
                <p className='text-gray-500 mb-8'>Fill your details and help others grow</p>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Full Name</label>
                        <input
                            type='text'
                            placeholder='Your name'
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            placeholder='Your email'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Skills</label>
                        <input
                            type='text'
                            placeholder='React, Node.js, Python (separate with comma)'
                            value={form.skills}
                            onChange={(e) => setForm({ ...form, skills: e.target.value })}
                            className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Experience</label>
                        <input
                            type='text'
                            placeholder='e.g: 3 years'
                            value={form.experience}
                            onChange={(e) => setForm({ ...form, experience: e.target.value })}
                            className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                            required
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Bio</label>
                        <textarea
                            placeholder='Tell us about yourself...'
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Zoom Link</label>
                        <input
                            type='text'
                            placeholder='https://zoom.us/j/...'
                            value={form.zoomLink}
                            onChange={(e) => setForm({ ...form, zoomLink: e.target.value })}
                            className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-all'
                    >
                        Register as Mentor
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MentorRegister