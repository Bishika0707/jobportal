import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetJobById from '@/hooks/useGetJobById'

const JobSetup = () => {
  const params = useParams()
  useGetJobById(params.id)

  const { singleJob } = useSelector(store => store.job)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    position: '',
    companyId: ''
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const payload = {
      ...input,
      salary: Number(input.salary),
      position: Number(input.position),
      experienceLevel: Number(input.experienceLevel),
      requirements: input.requirements
        .split(',')
        .map(r => r.trim())
    }

    try {
      setLoading(true)
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || '',
        description: singleJob.description || '',
        requirements: singleJob.requirements?.join(', ') || '',
        salary: singleJob.salary || '',
        location: singleJob.location || '',
        jobType: singleJob.jobType || '',
        experienceLevel: singleJob.experienceLevel || '',
        position: singleJob.position || '',
        companyId: singleJob.company?._id || ''
      })
    }
  }, [singleJob])

  return (
    <div>
      <Navbar />

      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          {/* HEADER */}
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate('/admin/jobs')}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Job Setup</h1>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4 px-8">
            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            <div className="col-span-2">
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div className="col-span-2">
              <Label>Requirements (comma separated)</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          {/* BUTTON */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default JobSetup
