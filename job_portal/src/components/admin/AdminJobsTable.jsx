import React, { useEffect, useMemo } from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from '../ui/table'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminJObsTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    // const { allAdminJobs } = useSelector(store => store.job)
    const allAdminJobs = useSelector(store => store.job?.allAdminJobs) || [];
    // const [filtereJobs, setFiltereJobs] = React.useState(allAdminJobs);
    const navigate = useNavigate();


    const filtereJobs = useMemo(() => {
        return allAdminJobs.filter(job => {
            if (!searchCompanyByText) return true;
            return job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
    }, [allAdminJobs, searchCompanyByText]);

    // useEffect(() => {
    //     const filtered = allAdminJobs.length > 0 &&  allAdminJobs.filter((job) => {
    //         if (!searchCompanyByText) return true;

    //         return job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    //     });

    //     setFiltereJobs(filtered);
    // }, [allAdminJobs, searchCompanyByText]);


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filtereJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className='text-sm text-muted-foreground text-center'>
                                    No companies found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtereJobs?.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className="cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-34'>
                                                <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJObsTable