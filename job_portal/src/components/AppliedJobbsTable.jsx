import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobbsTable = () => {

    const { allAppliedJobs } = useSelector(store => store.job)

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length < 0 ? <span>You haven't applied job</span> : allAppliedJobs.map((appliedjob) => (
                            <TableRow key={appliedjob._id}>
                                <TableCell>{appliedjob?.createdAt?.split('T')[0]}</TableCell>
                                <TableCell>{appliedjob?.job?.title}</TableCell>
                                <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        className={
                                            appliedjob.status === "accepted"
                                                ? "bg-green-500 text-white"
                                                : appliedjob.status === "rejected"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-500 text-white"
                                        }
                                    >
                                        {appliedjob.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobbsTable