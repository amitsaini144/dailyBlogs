import { ChangeEvent } from "react";

export function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border  rounded-lg">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only" htmlFor="editor">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-zinc-300 bg-black border-0 pl-2" placeholder="Write an article..." required />
                </div>
            </div>
        </div>
    </div>
}