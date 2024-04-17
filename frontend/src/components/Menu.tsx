import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom";


export default function Menu() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar size={"big"} name={"Amit"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><button
          onClick={() => {
            navigate("/myblogs")
          }}
        >My blogs</button></DropdownMenuItem>
        <DropdownMenuItem><button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin")
          }}
        >Logout</button></DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
