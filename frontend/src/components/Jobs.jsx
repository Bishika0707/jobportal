import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

function Jobs() {
    const { allJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.error("Please login to view jobs");
            navigate("/login");
            return;
        }

        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {
                    withCredentials: true, // ✅ send token cookie
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Failed to fetch jobs");
            }
        };

        fetchJobs();
    }, [user, dispatch, navigate]);

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>

                    {/* Filter Section */}
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>

                    {/* Jobs Section */}
                    {
                        allJobs.length === 0 ? (
                            <span>Job not found</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {allJobs.map((job) => (
                                        <div key={job?._id}>
                                            <Job job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default Jobs;
