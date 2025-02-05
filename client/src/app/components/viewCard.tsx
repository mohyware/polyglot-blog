import SummarizeButton from "./SummarizeButton";
import { Post } from "@/app/lib/definitions";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";

export default function Card({ post }: { post: Post }) {
    const title = post.title;
    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <Link href="/blog/[id]" as={`/blog/${post._id}`}>
                    <h1 className="text-2xl py-4 font-bold text-slate-900">{title}</h1>
                    <p >{format(post.createdAt, "PPpp")}</p>
                    <p>Last Update: {formatDistanceToNow(post.updatedAt)}</p>
                </Link>
                <div className="flex justify-end gap-4">
                    {/* <ViewPost id={post._id}></ViewPost> */}
                    <SummarizeButton id={post._id} title={title}></SummarizeButton>
                </div>
            </div>
            <p className="text-slate-700 break-words line-clamp-3  text-lg py-0">{post.body}</p>
        </div>
    );
}