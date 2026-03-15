import React from 'react'
import LatestJobsCards from './LatestJobsCards';
import { useSelector } from 'react-redux';


const LatestJobs = () => {

    const {allJobs} = useSelector((store) => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>Latest & Top <span className='text-[#6A38C2]'> Job Openings </span></h1>
            <div className='grid grid-cols-3 gap-5 my-5'>
                {
                   allJobs.length <= 0 ? <p>No jobs available</p> : allJobs?.slice(0, 3).map((job) => <LatestJobsCards job={job} key={job._id}/>)
                }   
            </div>
        </div>
    )
}

export default LatestJobs