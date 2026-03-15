import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '../../utils/constants'
import axios from 'axios'
import { setSingleCompany } from '@/redux/companySlice'


const useGeCompanyById = (companyId) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const featchSingleCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleCompany(response.data.company))
                }
            } catch (error) {
                console.log(error);
            }
        }
        featchSingleCompany();
    }, [companyId, dispatch])
}

export default useGeCompanyById