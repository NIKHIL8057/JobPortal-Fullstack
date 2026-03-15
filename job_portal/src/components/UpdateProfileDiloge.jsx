// import React from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle
// } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constants'
// import { toast } from 'sonner'
// import { setUser } from '@/redux/authSlice'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = React.useState(false)
//   const { user } = useSelector(store => store.auth)
//   const dispatch = useDispatch()

//   const [input, setInput] = React.useState({
//     username: user?.username || '',
//     email: user?.email || '',
//     phoneNumber: user?.phoneNumber || '',
//     bio: user?.profile?.bio || '',
//     skills: user?.profile?.skills?.map(skill => skill.name).join(', ') || '',
//     file: null
//   })

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value })
//   }

//   const fileChangeHandler = (e) => {
//     const file = e.target.files[0]
//     setInput({ ...input, file })
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     const formData = new FormData()
//     formData.append('username', input.username)
//     formData.append('email', input.email)
//     formData.append('phoneNumber', input.phoneNumber)
//     formData.append('bio', input.bio)
//     formData.append('skills', input.skills)

//     if (input.file) {
//       formData.append('resume', input.file)
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//           withCredentials: true
//         }
//       )

//       if (res.data.success) {
//         dispatch(setUser(res.data.user))
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response?.data?.message || 'Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//     setOpen(false)
//   }

//   return (
//     <Dialog open={open}>
//       <DialogContent
//         className="sm:max-w-lg"
//         onInteractOutside={() => setoOpen(false)}
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={submitHandler}>
//           <div className="grid gap-4">

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Name</Label>
//               <Input
//                 name="username"
//                 value={input.username}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={input.email}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Number</Label>
//               <Input
//                 name="phoneNumber"
//                 value={input.phoneNumber}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Bio</Label>
//               <Input
//                 name="bio"
//                 value={input.bio}
//                 onChange={changeEventHandler}
//                 className="col-span-3"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Skills</Label>
//               <Input
//                 name="skills"
//                 value={input.skills}
//                 onChange={changeEventHandler}
//                 placeholder="React, Node, MongoDB"
//                 className="col-span-3"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Resume</Label>
//               <Input
//                 type="file"
//                 name="resume"
//                 onChange={fileChangeHandler}
//                 className="col-span-3"
//               />
//             </div>

//           </div>

//           <DialogFooter>
//             <Button type="submit" className="w-full my-4" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 'Update Profile'
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default UpdateProfileDialog

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = React.useState(false)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const [input, setInput] = React.useState({
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map(skill => skill.name).join(', ') || '',
    file: null
  })

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
  const fileChangeHandler = (e) => setInput({ ...input, file: e.target.files[0] })

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('username', input.username)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file) formData.append('resume', input.file)
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      if (res.data.success) { dispatch(setUser(res.data.user)); toast.success(res.data.message) }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const fields = [
    { label: 'Name',   name: 'username',    type: 'text',  placeholder: 'Your name' },
    { label: 'Email',  name: 'email',       type: 'email', placeholder: 'your@email.com' },
    { label: 'Phone',  name: 'phoneNumber', type: 'text',  placeholder: '+91 XXXXX XXXXX' },
    { label: 'Bio',    name: 'bio',         type: 'text',  placeholder: 'Short bio about you' },
    { label: 'Skills', name: 'skills',      type: 'text',  placeholder: 'React, Node, MongoDB' },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl" onInteractOutside={() => setOpen(false)}>

        <DialogHeader className='px-6 pt-6 pb-4 border-b border-gray-100'>
          <DialogTitle className='text-lg font-bold text-gray-900'>Update Profile</DialogTitle>
          <p className='text-sm text-gray-400 mt-0.5'>Update your personal information</p>
        </DialogHeader>

        <form onSubmit={submitHandler} className='px-6 py-5 space-y-4'>
          {fields.map(({ label, name, type, placeholder }) => (
            <div key={name} className='space-y-1.5'>
              <Label className='text-sm font-medium text-gray-700'>{label}</Label>
              <Input type={type} name={name} value={input[name]} onChange={changeEventHandler}
                placeholder={placeholder} className='rounded-xl h-10 border-gray-200 focus:border-[#6A38C2] text-sm' />
            </div>
          ))}

          <div className='space-y-1.5'>
            <Label className='text-sm font-medium text-gray-700'>Resume</Label>
            <Input type="file" name="resume" onChange={fileChangeHandler}
              className='rounded-xl h-10 border-gray-200 text-sm file:mr-3 file:text-xs file:font-medium file:text-[#6A38C2] file:bg-[#6A38C2]/10 file:border-0 file:rounded-lg file:px-3 file:py-1 cursor-pointer' />
          </div>

          <div className='flex gap-3 pt-2'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}
              className='flex-1 rounded-xl h-10 text-sm border-gray-200 hover:border-gray-300'>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}
              className='flex-1 rounded-xl h-10 text-sm bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors cursor-pointer'>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : 'Update Profile'}
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog