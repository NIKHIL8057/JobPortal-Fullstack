import { createSlice } from "@reduxjs/toolkit"

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: ""
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        filterCompanies: (state, action) => {
            state.searchCompanyByText = action.payload;
            // state.companies = state.companies.filter(company => company.name.toLowerCase().includes(action.payload.toLowerCase()));
        }
    }
});

export const { setSingleCompany, setCompanies, filterCompanies } = companySlice.actions;
export default companySlice.reducer;