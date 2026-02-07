import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setSingleJob } from "@/redux/jobSlice"
import { JOB_API_END_POINT } from "@/utils/constant"

const useGetJobById = (id) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchJob = async () => {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setSingleJob(res.data.job))
            }
        }
        fetchJob()
    }, [id])
}

export default useGetJobById
