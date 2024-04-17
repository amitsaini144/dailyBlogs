import { useEffect, useState } from "react"
import axios from "axios";

export interface Blog {
    "Date": string,
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.post);
            setLoading(false);

        })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.posts);
            setLoading(false);
        })

    }, [])

    return {
        loading,
        blogs
    }
}
export const useMyBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [myblogs, setMyBlogs] = useState<Blog[]>([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk/myblogs`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setMyBlogs(response.data.posts);
            setLoading(false);
        })

    }, [])

    return {
        loading,
        myblogs
    }
}