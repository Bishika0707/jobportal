import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

function Job() {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-Gray-500'>
                    2 days ago
                </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://www.bing.com/th/id/OIP.kPWcRMSboc3zUi94Oh3sTAHaHa?w=195&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"></AvatarImage>
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>company name</h1>
                    <p className='text-sm text-gray-500'>Nepal</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>title</h1>
                <p className='text-sm text-Gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas ad doloremque eveniet repudiandae perspiciatis odit! Itaque architecto natus repellendus.</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost">12 Positons</Badge>
                <Badge className=" text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">24LPA</Badge>

            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save for Later</Button>

            </div>
        </div>
    )
}

export default Job
