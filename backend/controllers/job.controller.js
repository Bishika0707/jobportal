import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        };
        const requirementsArray = Array.isArray(requirements)
            ? requirements
            : requirements.split(",").map(req => req.trim());

        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId
        });


        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 })
            .lean();

        // 🔥 CONVERT ObjectId → string
        const formattedJobs = jobs.map(job => ({
            ...job,
            _id: job._id.toString()
        }));

        return res.status(200).json({
            jobs: formattedJobs,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Populate applicant inside applications
        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    select: "_id fullname email"
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        };

        // Check if the current user has applied
        const hasApplied = job.applications.some(
            app => app.applicant?._id.toString() === req.id
        );

        return res.status(200).json({
            job,
            success: true,
            hasApplied
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
//how many job created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId }).lean();

        const formattedJobs = jobs.map(job => ({
            ...job,
            _id: job._id.toString()
        }));

        return res.status(200).json({
            jobs: formattedJobs,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};
