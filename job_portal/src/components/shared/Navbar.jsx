// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from '../ui/button'
// import { LogOut, User2 } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { toast } from 'sonner'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constants'
// import { setUser } from '@/redux/authSlice'
// import { useNavigate } from 'react-router-dom'


// const Navbar = () => {
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//   const LogoutHandler = async () => {
//     try {
//       const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true })
//       if (res.data.success) {
//         dispatch(setUser(null))
//         navigate('/')
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response?.data?.message || 'Something went wrong')
//     }
//   }

//   return (
//     <div className='bg-white'>
//       <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//         <div>
//           <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
//         </div>
//         <div className='flex items-center gap-5'>
//           <ul className='flex font-medium items-center gap-5'>
//             {
//               user && user.role === 'recruiter' ? (
//                 <>
//                   <li><Link to='/admin/companies'>Companies</Link></li>
//                   <li><Link to='/admin/jobs'>Jobs</Link></li>
//                 </>
//               ) : (
//                 <>
//                   <li><Link to='/'>Home</Link></li>
//                   <li><Link to='/jobs'>Jobs</Link></li>
//                   <li><Link to='/browse'>Browse</Link></li>
//                 </>
//               )
//             }

//           </ul>
//           {
//             !user ? (
//               <div className='flex items-center gap-2'>
//                 <Link to='/login'><Button variant="outline" className="cursor-pointer">Login</Button></Link>
//                 <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">Sign up</Button></Link>
//               </div>
//             ) : (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Avatar className='cursor-pointer'>
//                     <AvatarImage className='h-10 rounded-full' src={user?.profile?.profilePhoto || ""} alt="@shadcn" />
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent className='w-80'>
//                   <div className='flex gap-4 space-y-2'>
//                     <Avatar className='cursor-pointer'>
//                       <AvatarImage className='h-10 rounded-full' src={user?.profile?.profilePhoto || ""} alt="@shadcn" />
//                     </Avatar>
//                     <div>
//                       <h4 className='font-medium'>{user?.username}</h4>
//                       <p className='text-sm text-muted-foreground'>{user?.profile?.bio || "No bio available"}</p>
//                     </div>
//                   </div>
//                   <div className='flex flex-col text-gray-600'>
//                     {
//                       user && user.role === 'student' && (
//                         <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                           <User2 />
//                           <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
//                         </div>
//                       )
//                     }

//                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                       <LogOut />
//                       <Button onClick={LogoutHandler} variant="link">Logout</Button>
//                     </div>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             )
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut, User2, Briefcase } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { setUser } from '@/redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const LogoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true })
      if (res.data.success) { dispatch(setUser(null)); navigate('/'); toast.success(res.data.message) }
    } catch (error) { toast.error(error.response?.data?.message || 'Something went wrong') }
  }

  const active = (path) => location.pathname === path ? 'text-[#F83002] font-semibold' : 'text-gray-600 hover:text-gray-900';

  return (
    <div className='sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
        <Link to='/' className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-[#F83002] rounded-lg flex items-center justify-center'>
            <Briefcase size={15} className='text-white' />
          </div>
          <h1 className='text-xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </Link>

        <div className='flex items-center gap-6'>
          <ul className='flex items-center gap-1'>
            {user?.role === 'recruiter' ? (
              <><li><Link className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active('/admin/companies')}`} to='/admin/companies'>Companies</Link></li>
                <li><Link className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active('/admin/jobs')}`} to='/admin/jobs'>Jobs</Link></li></>
            ) : (
              <>
                <li><Link className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active('/')}`} to='/'>Home</Link></li>
                <li><Link className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active('/jobs')}`} to='/jobs'>Jobs</Link></li>
                <li><Link className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active('/browse')}`} to='/browse'>Browse</Link></li>
                <li><Link className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${active('/mentor')}`} to='/mentor'>Mentor</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to='/login'><Button variant="outline" className="h-9 text-sm cursor-pointer">Login</Button></Link>
              <Link to='/signup'><Button className="h-9 text-sm bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">Sign up</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage className='h-9 w-9 rounded-full object-cover ring-2 ring-gray-200' src={user?.profile?.profilePhoto || ""} alt={user?.username} />
                  </Avatar>
                  <span className='text-sm font-medium text-gray-700'>{user?.username}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-64 p-3 rounded-2xl shadow-xl border border-gray-100' align='end' sideOffset={8}>
                <div className='flex gap-3 pb-3 border-b border-gray-100'>
                  <Avatar className='h-11 w-11'>
                    <AvatarImage className='h-11 w-11 rounded-full object-cover' src={user?.profile?.profilePhoto || ""} alt={user?.username} />
                  </Avatar>
                  <div>
                    <h4 className='font-semibold text-sm text-gray-900'>{user?.username}</h4>
                    <p className='text-xs text-gray-500 mt-0.5'>{user?.profile?.bio || "No bio available"}</p>
                  </div>
                </div>
                <div className='pt-2 space-y-0.5'>
                  {user?.role === 'student' && (
                    <Link to='/profile' className='flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors'>
                      <User2 size={15} /> View Profile
                    </Link>
                  )}
                  <Link to='/mentor/register' className='w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors'>
                    <User2 size={15} /> Become a Mentor
                  </Link>
                  <button onClick={LogoutHandler} className='w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors'>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar