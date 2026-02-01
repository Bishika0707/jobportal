import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, MailIcon, PenIcon } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './updateProfileDialog'
import { useSelector } from 'react-redux'


function Profile() {

  const [open, setOpen] = useState(false)


  const { user } = useSelector(store => store.auth)

  return (
    <div>
      <Navbar />

      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.bing.com/th/id/OIP.kPWcRMSboc3zUi94Oh3sTAHaHa?w=195&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
          >
            <PenIcon />
          </Button>
        </div>

        <div className='my-5'>
          <div>
            <div className='flex items-center gap-3 my-2'>
              <MailIcon />
              <span>{user?.email}</span>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          <div className='my-5'>
            <h1>Skills</h1>
            <div className='flex items-center gap-1'>
              {user?.profile?.skills?.length > 0 &&
                user.profile.skills.map((item, index) => (
                  <Badge key={index} className="mr-2">
                    {item}
                  </Badge>
                ))}
            </div>
          </div>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label className="text-md font-bold">Resume</Label>

            {user?.profile?.resume ? (
              <a
                href={user.profile.resume} // direct Cloudinary PDF link
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.profile.resumeOriginalName || "resume.pdf"}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>

        </div>
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
