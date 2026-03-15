import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '../../utils/constants'
import axios from 'axios'
import { setAllAdminJobs } from '@/redux/jobSlice'

const GetAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllAdminJobs(response.data.jobs)) // <- correct
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllAdminJobs();
    }, [dispatch]);

    return null; // This component only fetches data
}

export default GetAdminJobs