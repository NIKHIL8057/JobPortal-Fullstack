import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '../../utils/constants'
import axios from 'axios'
import { setCompanies } from '@/redux/companySlice'


const useGetAllCompanies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const featchCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setCompanies(response.data.companies))
                }
            } catch (error) {
                console.log(error);
            }
        }
        featchCompanies();
    }, [])
}

export default useGetAllCompanies