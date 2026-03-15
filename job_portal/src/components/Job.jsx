// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const Job = ({job}) => {

//   const navigate = useNavigate();
//   // const jobId = "qwerfghnmcvghj"

//   const dayAgoFunction = (mongodbTime) => {
//      const createdAt = new Date(mongodbTime);
//       const currentTime = new Date();
//       const timeDifference = currentTime - createdAt;
//       const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//       return daysAgo;
//   }


//   return (
//     <div className='p-5 shadow-xl bg-white border border-gray-100'>
//       <div className='flex items-center justify-between'>
//         <p className='text-sm text-gray-500'>{dayAgoFunction(job?.createdAt) === 0 ? "Today" : `${dayAgoFunction(job?.createdAt)} days ago`}</p>
//         <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
//       </div>
//       <div className='flex items-center gap-2 my-2'>
//         <Button className='p-6' variant='outline' size='icon'>
//           <Avatar>
//             <AvatarImage src={job?.company?.logo} />
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//           <p className='text-sm text-gray-500'>India</p>
//         </div>
//       </div>
//       <div>
//         <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//         <p className='text-sm text-gray-600'>{job?.description}</p>
//       </div>
//       <div className='flex items-center gap-4 mt-4'>
//         <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
//         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
//       </div>
//       <div className='flex items-center gap-4 mt-5'>
//         <Button onClick={() => navigate(`/description/${job._id}`) } variant='outline'>Details</Button>
//         <Button className='bg-[#7209b7]'>Save For Later</Button>
//       </div>
//     </div>
//   )
// }

// export default Job

import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Users, Clock, IndianRupee } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const dayAgoFunction = (mongodbTime) => {
    const daysAgo = Math.floor((new Date() - new Date(mongodbTime)) / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : `${daysAgo}d ago`;
  }

  return (
    <div className='group p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#6A38C2]/20 hover:-translate-y-1 transition-all duration-300'>

      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <span className='text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full'>{dayAgoFunction(job?.createdAt)}</span>
        <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full hover:bg-[#6A38C2]/10 hover:text-[#6A38C2] transition-colors'>
          <Bookmark size={15} />
        </Button>
      </div>

      {/* Company */}
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-11 h-11 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center bg-white overflow-hidden shrink-0'>
          <Avatar className='h-9 w-9'><AvatarImage src={job?.company?.logo} /></Avatar>
        </div>
        <div>
          <h1 className='font-semibold text-gray-900 text-sm'>{job?.company?.name}</h1>
          <p className='flex items-center gap-1 text-xs text-gray-400'><MapPin size={10} className='text-[#F83002]' />India</p>
        </div>
      </div>

      {/* Title & Description */}
      <h1 className='font-bold text-gray-900 group-hover:text-[#6A38C2] transition-colors mb-1'>{job?.title}</h1>
      <p className='text-xs text-gray-400 line-clamp-2 leading-relaxed'>{job?.description}</p>

      {/* Badges */}
      <div className='flex items-center gap-2 mt-4 flex-wrap'>
        <Badge className='flex items-center gap-1 bg-blue-50 text-blue-600 border-0 text-[11px] rounded-full px-2.5 py-1'><Users size={10} />{job?.position} Positions</Badge>
        <Badge className='flex items-center gap-1 bg-orange-50 text-[#F83002] border-0 text-[11px] rounded-full px-2.5 py-1'><Clock size={10} />{job?.jobType}</Badge>
        <Badge className='flex items-center gap-1 bg-purple-50 text-[#7209b7] border-0 text-[11px] rounded-full px-2.5 py-1'><IndianRupee size={10} />{job?.salary} LPA</Badge>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-3 mt-5'>
        <Button onClick={() => navigate(`/description/${job._id}`)} variant='outline' className='flex-1 rounded-xl h-9 text-sm border-gray-200 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-colors'>Details</Button>
        <Button className='flex-1 rounded-xl h-9 text-sm bg-[#7209b7] hover:bg-[#6A38C2] transition-colors cursor-pointer'>Save For Later</Button>
      </div>
    </div>
  )
}

export default Job