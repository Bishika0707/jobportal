/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

function UpdateProfileDialog({ open, setOpen }) {

    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null
    })

    // Auto-fill input whenever dialog opens and user exists
    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user.fullname || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills?.join(", ") || "",
                file: null
            })
        }
    }, [user, open])

    // Common change handler for all text inputs
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    // Submit handler
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("fullname", input.fullname)
            formData.append("email", input.email)
            formData.append("phoneNumber", input.phoneNumber)
            formData.append("bio", input.bio)
            formData.append("skills", input.skills)

            if (input.file) {
                formData.append("file", input.file)
            }

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Name</Label>
                            <Input
                                name="fullname"
                                className="col-span-3"
                                value={input.fullname}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Email</Label>
                            <Input
                                name="email"
                                className="col-span-3"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Number</Label>
                            <Input
                                name="phoneNumber"
                                className="col-span-3"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Bio</Label>
                            <Input
                                name="bio"
                                className="col-span-3"
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Skills</Label>
                            <Input
                                name="skills"
                                className="col-span-3"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Resume</Label>
                            <Input
                                className="col-span-3"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) =>
                                    setInput({ ...input, file: e.target.files[0] })
                                }
                            />
                        </div>

                    </div>

                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                please wait..
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    ) 
}

export default UpdateProfileDialog
