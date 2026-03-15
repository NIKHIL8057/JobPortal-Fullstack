import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {

    // const { companies } = useSelector((store) => store.company)
    const companies = useSelector((store) => store.company?.companies) || [];
    const searchCompanyByText = useSelector((store) => store.company?.searchCompanyByText) || "";
    const [filteredCompany, setFilteredCompany] = React.useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = companies.length > 0 && companies.filter((company) => {
            if(!searchCompanyByText) return true;

            return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilteredCompany(filtered);
    },[companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filteredCompany.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className='text-sm text-muted-foreground text-center'>
                                    No companies found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCompany?.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} alt="@shadcn" />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className="cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-34'>
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
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

export default CompaniesTable