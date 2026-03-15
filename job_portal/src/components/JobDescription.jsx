// import React, { useEffect } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';


// const JobDescription = () => {

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();
//     const { singleJob } = useSelector(store => store.job)
//     const { user } = useSelector(store => store.auth)
//     const isInsatlayApplied = singleJob?.application?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = React.useState(isInsatlayApplied);

//     const applyJobHandle = async () => {
//         try {
//             const response = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}` , { withCredentials: true });
//             console.log(response);
//                 if (response.data.success) {
//                     setIsApplied(true);
//                     const updateSingleJob = {...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
//                     dispatch(setSingleJob(updateSingleJob)); // Update the single job in the Redux store with the new application
//                     toast.success(response.data.message);
//                 }

//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to apply for the job. Please try again later.");
//         }
//     }


//     useEffect(() => {
//         const featchSinglejob = async () => {
//             try {
//                 const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

//                 if (response.data.success) {
//                     dispatch(setSingleJob(response.data.job))
//                     setIsApplied(response.data.job.application.some(application => application.applicant === user?._id) || false);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         featchSinglejob();
//     }, [jobId, dispatch, user?._id]);

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position}      Positions</Badge>
//                         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
//                         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                 onClick={isApplied ? null : applyJobHandle}
//                  disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : "bg-[#7209b7] hover:bg-[#5f32ad] "} `}>{isApplied ? 'Already Applied' : 'Apply now'}</Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.title}</h1>
//             <div>
//                 <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} Years</span></h1>
//                 <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}.</span></h1>
//                 <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription

import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { MapPin, Briefcase, Clock, IndianRupee, Users, CalendarDays, GraduationCap } from 'lucide-react';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singleJob?.application?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = React.useState(isInitiallyApplied);

    const applyJobHandle = async () => {
        try {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (response.data.success) {
                setIsApplied(true);
                dispatch(setSingleJob({ ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to apply for the job. Please try again later.");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(response.data.job.application.some(application => application.applicant === user?._id) || false);
                }
            } catch (error) { console.log(error) }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const details = [
        { icon: Briefcase,     label: "Role",             value: singleJob?.title },
        { icon: GraduationCap, label: "Experience",       value: `${singleJob?.experienceLevel} Years` },
        { icon: MapPin,        label: "Location",         value: singleJob?.location },
        { icon: IndianRupee,   label: "Salary",           value: `${singleJob?.salary} LPA` },
        { icon: Users,         label: "Total Applicants", value: singleJob?.application?.length },
        { icon: CalendarDays,  label: "Posted Date",      value: singleJob?.createdAt?.split("T")[0] },
    ];

    return (
        <div className='max-w-4xl mx-auto my-10 px-4'>

            {/* Header Card */}
            <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <h1 className='font-bold text-2xl text-gray-900'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-3 flex-wrap'>
                            <Badge className='flex items-center gap-1 bg-blue-50 text-blue-600 border-0 text-xs rounded-full px-3 py-1'><Users size={10} />{singleJob?.position} Positions</Badge>
                            <Badge className='flex items-center gap-1 bg-orange-50 text-[#F83002] border-0 text-xs rounded-full px-3 py-1'><Clock size={10} />{singleJob?.jobType}</Badge>
                            <Badge className='flex items-center gap-1 bg-purple-50 text-[#7209b7] border-0 text-xs rounded-full px-3 py-1'><IndianRupee size={10} />{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandle}
                        disabled={isApplied}
                        className={`rounded-xl px-6 h-10 text-sm font-medium shrink-0 transition-all cursor-pointer ${isApplied ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#6A38C2] text-white shadow-md shadow-[#7209b7]/20'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            {/* Description */}
            <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6'>
                <h2 className='font-semibold text-gray-900 mb-3 text-base'>Job Description</h2>
                <p className='text-sm text-gray-600 leading-relaxed'>{singleJob?.description}</p>
            </div>

            {/* Details Grid */}
            <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm'>
                <h2 className='font-semibold text-gray-900 mb-4 text-base'>Job Details</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {details.map(({ icon: Icon, label, value }) => (
                        <div key={label} className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                            <div className='w-8 h-8 bg-[#6A38C2]/10 rounded-lg flex items-center justify-center shrink-0'>
                                <Icon size={14} className='text-[#6A38C2]' />
                            </div>
                            <div>
                                <p className='text-[11px] text-gray-400 font-medium'>{label}</p>
                                <p className='text-sm text-gray-800 font-semibold'>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default JobDescription