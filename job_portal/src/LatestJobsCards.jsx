// import React from 'react'
// import { Badge } from './components/ui/badge'
// import { useNavigate } from 'react-router-dom';

// const LatestJobsCards = ({job}) => {

//       const navigate = useNavigate();

//   return (
//     <div onClick={() => navigate(`/description/${job._id}`)} className='p-4 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
//       <div>
//         <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//         <p className='text-sm text-gray-500'>India</p>
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
//     </div>
//   )
// }
// export default LatestJobsCards

import React from 'react'
import { Badge } from './components/ui/badge'
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUpRight, Users, IndianRupee, Clock } from 'lucide-react';

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/description/${job._id}`)}
      className='group relative p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#6A38C2]/30 shadow-sm hover:shadow-2xl hover:shadow-[#6A38C2]/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden'>

      <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6A38C2] via-violet-400 to-[#F83002] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />

      {/* Company Header */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-[#6A38C2] to-violet-400 flex items-center justify-center shadow-md shadow-[#6A38C2]/30 text-white font-bold text-base'>
            {job?.company?.name?.[0]}
          </div>
          <div>
            <p className='font-semibold text-gray-900 text-sm'>{job?.company?.name}</p>
            <p className='flex items-center gap-1 text-[11px] text-gray-400'><MapPin size={10} className='text-[#F83002]' /> India</p>
          </div>
        </div>
        <ArrowUpRight size={16} className='text-gray-300 group-hover:text-[#6A38C2] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all' />
      </div>

      {/* Title & Description */}
      <h1 className='font-bold text-[15px] text-gray-900 group-hover:text-[#6A38C2] transition-colors'>{job?.title}</h1>
      <p className='text-[12px] text-gray-400 mt-1 line-clamp-2 leading-relaxed'>{job?.description}</p>

      {/* Divider */}
      <div className='border-t border-dashed border-gray-100 my-4' />

      {/* Badges */}
      <div className='flex items-center gap-2 flex-wrap'>
        <Badge className='flex items-center gap-1 bg-blue-50 text-blue-600 border-0 text-[11px] font-medium rounded-full px-2.5 py-1'><Users size={10} />{job?.position} Positions</Badge>
        <Badge className='flex items-center gap-1 bg-orange-50 text-[#F83002] border-0 text-[11px] font-medium rounded-full px-2.5 py-1'><Clock size={10} />{job?.jobType}</Badge>
        <Badge className='flex items-center gap-1 bg-purple-50 text-[#6A38C2] border-0 text-[11px] font-medium rounded-full px-2.5 py-1'><IndianRupee size={10} />{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobsCards