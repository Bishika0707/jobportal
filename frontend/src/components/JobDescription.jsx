import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

function JobDescription() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { singleJob } = useSelector((state) => state.job);
    const { user } = useSelector((state) => state.auth);

    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setSingleJob({ ...res.data.job, hasApplied: res.data.hasApplied }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) fetchSingleJob();
    }, [id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                fetchSingleJob();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    };

    if (!singleJob) {
        return <div className="text-center mt-10">Loading job...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob.title}</h1>

                    <div className="flex items-center gap-2 mt-4">
                        <Badge variant="ghost" className="text-blue-700 font-bold">
                            {singleJob.position} Positions
                        </Badge>

                        <Badge variant="ghost" className="text-[#F83002] font-bold">
                            {singleJob.jobType}
                        </Badge>

                        <Badge variant="ghost" className="text-[#7209b7] font-bold">
                            {singleJob.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={singleJob.hasApplied ? null : applyJobHandler}
                    disabled={singleJob.hasApplied}
                    className={`rounded-lg ${singleJob.hasApplied
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#7209b7] hover:bg-[#5f328d]"
                        }`}
                >
                    {singleJob.hasApplied ? "Already Applied" : "Apply Now"}
                </Button>
            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
                Job Description
            </h1>

            <div className="my-4 space-y-2">
                <p><b>Role:</b> {singleJob.title}</p>
                <p><b>Location:</b> {singleJob.location}</p>
                <p><b>Description:</b> {singleJob.description}</p>
                <p><b>Experience:</b> {singleJob.experience} years</p>
                <p><b>Salary:</b> {singleJob.salary} LPA</p>
                <p><b>Total Applications:</b> {singleJob.applications?.length || 0}</p>
                <p><b>Posted Date:</b> {new Date(singleJob.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default JobDescription;