import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Spotlight } from "@/components/ui/Spotlight";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    const [buffer, setBuffer] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup")
        }
        else {
            setBuffer(false)
        }
    }, [])
    if (buffer) {
        return <div></div>
    }

    if (loading || !blog) {
        return <div className="h-full w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="z-20 w-full">
        <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
        </div>
      </div>
        
       
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}
