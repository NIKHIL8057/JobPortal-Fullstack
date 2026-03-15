import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { filterCompanies } from '@/redux/companySlice'
import AdminJObsTable from './AdminJobsTable'
import GetAdminJobs from '../hooks/GetAdminJobs'

const Jobs = () => {
    GetAdminJobs();
    const navigate = useNavigate();
    const [input, setInput] = React.useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterCompanies(input));
    }, [input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input onChange={(e) => setInput(e.target.value)} className="w-fit" placeholder="Filter by name" />
                    <Button onClick={() => navigate("/admin/jobs/post")}>New Jobs</Button>
                </div>
                <AdminJObsTable />
            </div>
        </div>
    )
}

export default Jobs