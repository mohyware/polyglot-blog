import { AdminViewPost, EditPost, DeletePost } from "./buttons";
import { Post } from "@/app/lib/definitions";
import { format, formatDistanceToNow } from "date-fns";

export default function Card({ post }: { post: Post }) {
    const title = post.title;
    return (
        <div>
            <div className="flex flex-row break-words justify-between items-center py-4">
                <div>
                    <h1 className="text-2xl py-4 font-bold text-slate-900">{title}</h1>
                    <p >{format(post.createdAt, "PPpp")}</p>
                    <p>Last Update: {formatDistanceToNow(post.updatedAt)}</p>
                </div>
                <div className="flex justify-end gap-3 items-center">
                    <AdminViewPost id={post._id}></AdminViewPost>
                    <EditPost id={post._id}></EditPost>
                    <DeletePost id={post._id}></DeletePost>
                </div>
            </div>
            <p className="text-slate-700 break-words line-clamp-3 text-lg py-0">{post.body}</p>
        </div>
    );
}