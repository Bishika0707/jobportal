import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../auth/login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <h1 className="text-2xl font-bold">
          job<span className="text-[#F83002]">portal</span>
        </h1>

        <div className="flex items-center gap-12">

          <ul className="flex font-medium items-center gap-5">
            <li className="cursor-pointer hover:text-primary transition"><Link to="/">Home</Link></li>
            <li className="cursor-pointer hover:text-primary transition"><Link to="/jobs">Jobs</Link></li>
            <li className="cursor-pointer hover:text-primary transition"><Link to="/browse">Browse</Link></li>
          </ul>
          {
            !user ? (
              <div className="flex items-center gap-2">
                <Link to="/Login"><Button variant="outline">Login</Button></Link>
                <Link to="/Signup"><Button className="bg-[#6A38C2] hover:bg-[#3f138d]">Signup</Button>
                </Link>

              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />                    <AvatarFallback>BC</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />                      <AvatarFallback>BC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer focus:outline-none">
                      <User2 />
                      <Button variant="link" className="w-full">
                        <Link to="/profile">view profile</Link>
                      </Button>

                    </div>

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link" className="w-full">
                        Logout
                      </Button>
                    </div>
                  </div>


                </PopoverContent>
              </Popover>
            )
          }

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
