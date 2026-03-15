import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { filterCompanies } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const [input,setInput] = React.useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterCompanies(input));
    },[input])

  return (
    <div>
        <Navbar />
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input onChange={(e) => setInput(e.target.value)} className="w-fit" placeholder="Filter by name" />
                <Button onClick={() => navigate("/admin/company/create")}>New Company</Button>
            </div>
            <CompaniesTable />
        </div>
    </div>
  )
}

export default Companies