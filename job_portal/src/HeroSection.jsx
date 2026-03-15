import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from './redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

  const [query,serQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query))
      navigate('/browse')
  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className=' m-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002]'>No. 1 Job Hunt Website</span>
        <h1 className='font-bold text-5xl'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span> </h1>
        <p>Thousands of jobs from top companies. Find the right opportunity and take the next step in your career.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 items-center pl-3 rounded-full gap-4 m-auto'>
          <input 
          type="text" 
          onChange={(e) => serQuery(e.target.value) }
          placeholder='Find your dream jobs'
          className='outline-none border-none w-full'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
            <Search className='h-5 w-5'/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
