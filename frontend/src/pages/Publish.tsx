import { Appbar } from "../components/Appbar"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { CreatePostType } from "@amitsaini144/common-medium";
import { TextEditor } from "@/components/TextEditor";
import { toast, Toaster } from "sonner"


const getCurrentDate = (): string => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const date = String(dateObj.getDate()).padStart(2, "0");
    return `${date} ${month} ${year}`;
}

export const Publish = () => {
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [buffer, setBuffer] = useState(true);
    const Date = () => {
        const currentDate = useMemo(() => getCurrentDate(), []);
        return currentDate;
    };

    const [postInputs, setPostInputs] = useState<CreatePostType>({
        title: "",
        content: "",
        Date: Date()
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup")
        } else {
            setBuffer(false)
        }
    }, [])
    if (buffer) {
        return <div></div>
    }

    const publishPost = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/`, postInputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`)
        } catch (error) {
            return (
                toast('Error while publishing', {
                    action: {
                        label: 'Close',
                        onClick: () => toast.dismiss(),
                    },
                })
            )
        }
    }

    return <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
        />
        <div className="z-20 w-full">
            <div>
                <Appbar />
                <div className="flex justify-center w-full pt-8 mt-32 h-screen">
                    <div className="max-w-screen-lg w-5/6">
                        <input onChange={(e) => {
                            setPostInputs(p => ({
                                ...p,
                                title: e.target.value
                            }))
                        }} type="text" className="w-full bg-black/50 border border-gray-300 text-zinc-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " placeholder="Title" />

                        <TextEditor onChange={(e) => {
                            setPostInputs(p => ({
                                ...p,
                                content: e.target.value
                            }))
                        }} />

                        <button onClick={publishPost} type="submit" className="text-black hover:text-white border border-white bg-white hover:bg-black font-medium rounded-2xl text-sm px-5 py-2.5 text-center mt-2 ">
                            Publish post
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Toaster />
    </div>
}


