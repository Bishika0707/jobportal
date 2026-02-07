import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

import { useRef } from "react";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        const fetchCompanies = async () => {
            try {
                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, [dispatch]);
};


export default useGetAllCompanies;
