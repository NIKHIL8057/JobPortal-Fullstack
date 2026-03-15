import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '../../utils/constants'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'


const useGetAllJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const featchAllJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        featchAllJobs();
    }, [])
}

export default useGetAllJobs