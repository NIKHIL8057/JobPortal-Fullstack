// import React, { use, useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge'
// import AppliedJobbsTable from './AppliedJobbsTable'
// import UpdateProfileDiloge from './UpdateProfileDiloge'
// import { useSelector } from 'react-redux'
// import GetAllAppliedjob from './hooks/GetAllAppliedjob'

// const isResume = true;

// const Profile = () => {
    
//     GetAllAppliedjob();
//     const [open, setOpen] = useState(false)
//     const { user } = useSelector(store => store.auth)

//     return ( 
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//                 <div className='flex justify-between'>
//                     <div className='flex items-center gap-5'>
//                         <Avatar className='h-24 w-24'>
//                             <AvatarImage src={user?.profile?.profilePhoto || ""} />
//                         </Avatar>
//                         <div>
//                             <h1 className='font-medium text-xl'>{user?.username}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
//                 </div>
//                 <div>
//                     <div className='flex items-center gap-3'>
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className='flex items-center gap-3'>
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div className='my-5'>
//                     <h1>Skills</h1>
//                     <div className='flex items-center gap-1'>
//                         {
//                             user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
//                         }
//                     </div>
//                 </div>
//                 <div className='grid w-full max-w-sm items-center gap-1.5'>
//                     <label className='text-md font-bold'>Resume</label>

//                     {
//                         isResume && user?.profile?.resume
//                             ? (
//                                 <a
//                                     target='_blank'
//                                     href={user.profile.resume}
//                                     className='text-blue-600 hover:underline cursor-pointer'
//                                 >
//                                     {user.profile.resumeOriginalName}
//                                 </a>
//                             )
//                             : <span>NA</span>
//                     }
//                 </div>
//             </div>
//             <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//                 <h1 className='font-bold text-xl my-3'>Applied Jobs</h1>
//                 {/* Application table */}
//                 <AppliedJobbsTable />
//             </div>
//             <UpdateProfileDiloge open={open} setOpen={setOpen} />
//         </div>
//     )
// }

// export default Profile

import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobbsTable from './AppliedJobbsTable'
import UpdateProfileDiloge from './UpdateProfileDiloge'
import { useSelector } from 'react-redux'
import GetAllAppliedjob from './hooks/GetAllAppliedjob'

const Profile = () => {
    GetAllAppliedjob();
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8 space-y-5'>

                {/* Profile Card */}
                <div className='bg-white border border-gray-100 rounded-2xl shadow-sm p-6'>

                    {/* Top: Avatar + Info + Edit */}
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-5'>
                            <div className='relative'>
                                <Avatar className='h-20 w-20 ring-4 ring-[#6A38C2]/10'>
                                    <AvatarImage src={user?.profile?.profilePhoto || ""} />
                                </Avatar>
                                <span className='absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full' />
                            </div>
                            <div>
                                <h1 className='font-bold text-xl text-gray-900'>{user?.username}</h1>
                                <p className='text-sm text-gray-500 mt-0.5 max-w-xs'>{user?.profile?.bio || "No bio added yet"}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} variant='outline' size='icon' className='rounded-xl h-9 w-9 border-gray-200 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-colors'>
                            <Pen size={14} />
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className='mt-5 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3'>
                        <div className='flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-xl'>
                            <Mail size={14} className='text-[#6A38C2]' />{user?.email}
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-xl'>
                            <Contact size={14} className='text-[#6A38C2]' />{user?.phoneNumber}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className='mt-5 pt-5 border-t border-gray-100'>
                        <p className='text-sm font-semibold text-gray-700 mb-2.5'>Skills</p>
                        <div className='flex items-center gap-2 flex-wrap'>
                            {user?.profile?.skills?.length
                                ? user.profile.skills.map((item, i) => (
                                    <Badge key={i} className='bg-[#6A38C2]/10 text-[#6A38C2] border-0 rounded-full px-3 py-1 text-xs font-medium'>{item}</Badge>
                                ))
                                : <span className='text-sm text-gray-400'>No skills added</span>}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className='mt-5 pt-5 border-t border-gray-100'>
                        <p className='text-sm font-semibold text-gray-700 mb-2'>Resume</p>
                        {user?.profile?.resume
                            ? <a target='_blank' href={user.profile.resume} className='flex items-center gap-2 text-sm text-[#6A38C2] font-medium hover:underline w-fit'>
                                <FileText size={14} />{user.profile.resumeOriginalName}
                              </a>
                            : <span className='text-sm text-gray-400'>No resume uploaded</span>}
                    </div>
                </div>

                {/* Applied Jobs */}
                <div className='bg-white border border-gray-100 rounded-2xl shadow-sm p-6'>
                    <h1 className='font-bold text-lg text-gray-900 mb-4'>Applied Jobs</h1>
                    <AppliedJobbsTable />
                </div>
            </div>
            <UpdateProfileDiloge open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile