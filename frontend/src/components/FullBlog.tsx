import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { Spotlight } from "@/components/ui/Spotlight";


export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div className="min-h-screen h-full w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
        />
        <div className="z-20 w-full">
            <div>
                <Appbar />
                <div className="flex justify-center mt-28">
                    <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-y-20 gap-x-20 h-fit mb-20">
                        <div className="lg:col-span-8 col-span-12">
                            <div>
                                <div className="text-5xl font-extrabold text-white w-2/3 lg:w-full ">
                                    {blog.title}
                                </div>
                                <div className="text-zinc-400 pt-2">
                                    {`Post on ${blog.Date}`}
                                </div>
                                <div className="pt-4 text-zinc-300 w-96 lg:w-full">
                                    {blog.content}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div>
                                <div className="text-zinc-400 text-lg">
                                    Author
                                </div>
                                <div className="flex w-full">
                                    <div className="pr-4 flex flex-col justify-center">
                                        <Avatar size="small" name={blog.author.name || "Anonymous"} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white">
                                            {blog.author.name || "Anonymous"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


}