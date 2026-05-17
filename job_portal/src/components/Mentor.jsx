import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'
import { MENTOR_API_END_POINT } from '@/utils/constants'
import { useSelector } from 'react-redux'

const Mentor = () => {
    const [mentors, setMentors] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedMentor, setSelectedMentor] = useState(null)
    const [form, setForm] = useState({ course: '', message: '' })
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        fetchMentors()
    }, [])

    const fetchMentors = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${MENTOR_API_END_POINT}/all`, { withCredentials: true })
            if (res.data.success) {
                setMentors(res.data.mentors)
            }
        } catch (error) {
            toast.error("Mentors could not be loaded")
        } finally {
            setLoading(false)
        }
    }

    const handleRequest = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${MENTOR_API_END_POINT}/request`, {
                mentorId: selectedMentor._id,
                course: form.course,
                message: form.message
            }, { withCredentials: true })

            if (res.data.success) {
                toast.success("Request sent successfully!")
                setSelectedMentor(null)
                setForm({ course: '', message: '' })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Request failed")
        }
    }

   const handleDelete = async () => {
    toast("Are you sure you want to delete your mentor profile?", {
        action: {
            label: "Delete",
            onClick: async () => {
                try {
                    const res = await axios.delete(`${MENTOR_API_END_POINT}/delete`, { withCredentials: true })
                    if (res.data.success) {
                        toast.success("Mentor profile deleted successfully!")
                        fetchMentors()
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || "Delete failed")
                }
            }
        },
        cancel: {
            label: "Cancel",
            onClick: () => {}
        }
    })
}
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-10'>
                <h1 className='text-3xl font-bold mb-2'>Find a Mentor</h1>
                <p className='text-gray-500 mb-8'>Get guidance from expert mentors for your career</p>

                {loading ? (
                    <div className='text-center py-20 text-gray-400'>Loading mentors...</div>
                ) : mentors.length === 0 ? (
                    <div className='text-center py-20 text-gray-400'>No mentors available right now</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {mentors.map((mentor) => (
                            <div key={mentor._id} className='border rounded-xl p-6 shadow-sm hover:shadow-md transition-all'>
                                <div className='w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl mb-4'>
                                    {mentor.name.charAt(0)}
                                </div>

                                <h2 className='text-xl font-semibold'>{mentor.name}</h2>
                                <p className='text-gray-500 text-sm mb-2'>{mentor.experience} experience</p>
                                <p className='text-gray-600 text-sm mb-4'>{mentor.bio}</p>

                                <div className='flex flex-wrap gap-2 mb-4'>
                                    {mentor.skills.map((skill, i) => (
                                        <span key={i} className='bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full'>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Apna mentor hai toh Delete button dikhe, warna Request button */}
                                {user && mentor.userId === user._id ? (
                                    <button
                                        onClick={() => handleDelete(mentor._id)}
                                        className='w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-all'
                                    >
                                        Delete My Mentor Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setSelectedMentor(mentor)}
                                        className='w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-all'
                                    >
                                        Request Mentor
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedMentor && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-xl p-8 w-full max-w-md mx-4'>
                        <h2 className='text-xl font-bold mb-1'>Request {selectedMentor.name}</h2>
                        <p className='text-gray-500 text-sm mb-6'>Fill your details — mentor will receive an email</p>

                        <form onSubmit={handleRequest} className='space-y-4'>
                            <div>
                                <label className='text-sm font-medium text-gray-700'>Course / Topic</label>
                                <input
                                    type='text'
                                    placeholder='e.g: Full Stack, DSA, React...'
                                    value={form.course}
                                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                                    className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                                    required
                                />
                            </div>

                            <div>
                                <label className='text-sm font-medium text-gray-700'>Message</label>
                                <textarea
                                    placeholder='What do you want to tell the mentor...'
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className='w-full border rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400'
                                    rows={4}
                                />
                            </div>

                            <div className='flex gap-3 pt-2'>
                                <button
                                    type='button'
                                    onClick={() => setSelectedMentor(null)}
                                    className='flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium'
                                >
                                    Send Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Mentor