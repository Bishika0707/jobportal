import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Briefcase, MapPin, DollarSign, Calendar, Users } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-5xl mx-auto my-12 p-8 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6'>
                <div>
                    <h1 className='font-extrabold text-3xl text-gray-900'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-3 mt-5'>
                        <Badge className='bg-blue-100 text-blue-700 font-semibold shadow-sm' variant=''>
                            <Briefcase className='inline mr-1 w-4 h-4' />
                            {singleJob?.position || 'N/A'} Positions
                        </Badge>
                        <Badge className='bg-red-100 text-red-600 font-semibold shadow-sm'>
                            {singleJob?.jobType || 'N/A'}
                        </Badge>
                        <Badge className='bg-purple-100 text-purple-700 font-semibold shadow-sm'>
                            <DollarSign className='inline mr-1 w-4 h-4' />
                            {singleJob?.salary || 'N/A'} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-xl px-8 py-3 text-white font-bold text-lg shadow-md transition-transform transform hover:scale-105
                        ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Description Card */}
            <div className='mt-10 bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4'>
                <h2 className='text-xl font-semibold border-b pb-2 mb-4'>Job Description</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700'>
                    <div className='space-y-3'>
                        <p className='flex items-center gap-2'><Briefcase className='text-purple-600' /> <span className='font-semibold'>Role:</span> {singleJob?.title}</p>
                        <p className='flex items-center gap-2'><MapPin className='text-red-500' /> <span className='font-semibold'>Location:</span> {singleJob?.location}</p>
                        <p className='flex items-center gap-2'><DollarSign className='text-green-500' /> <span className='font-semibold'>Salary:</span> {singleJob?.salary} LPA</p>
                        <p className='flex items-center gap-2'><Calendar className='text-gray-600' /> <span className='font-semibold'>Experience:</span> {singleJob?.experienceLevel || 'N/A'} yrs</p>
                    </div>

                    <div className='space-y-3'>
                        <p className='flex items-center gap-2'><Users className='text-blue-500' /> <span className='font-semibold'>Total Applicants:</span> {singleJob?.applications?.length || 0}</p>
                        <p className='flex items-center gap-2'><Calendar className='text-gray-400' /> <span className='font-semibold'>Posted Date:</span> {singleJob?.createdAt?.split("T")[0]}</p>
                        <p className='flex flex-col gap-1'><span className='font-semibold'>Description:</span> <span className='text-gray-800'>{singleJob?.description}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
