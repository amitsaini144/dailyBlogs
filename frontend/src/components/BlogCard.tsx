import { Link } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`} className="px-5 md:px-0 md:mx-4">
        <div className="p-4 border border-slate-200 pb-4 cursor-pointer mb-10 backdrop-blur-3xl backdrop-brightness-150 rounded-md">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col text-white">{authorName}</div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-zinc-400 text-sm flex justify-center flex-col tracking-wide">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2 text-white">
                {title}
            </div>
            <div className="text-md font-thin text-white">
                {content.slice(0, 50) + "..."}
            </div>
            <div className="text-zinc-400 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 400)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-zinc-500 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}