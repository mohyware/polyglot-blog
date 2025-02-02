import { AdminViewPost, EditPost, DeletePost } from "./buttons";
import { Post } from "@/app/lib/definitions";
export default async function Card({ post }: { post: Post }) {
    const title = post.title;
    const previewText = post.body.split('. ').slice(0, 2).join('. ') + '...';
    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <h1 className="text-2xl py-4 font-bold text-slate-900">{title}</h1>
                <div className="flex justify-end gap-3 items-center">
                    <AdminViewPost id={post._id}></AdminViewPost>
                    <EditPost id={post._id}></EditPost>
                    <DeletePost id={post._id}></DeletePost>
                </div>
            </div>
            <p className="text-slate-700 text-lg py-2">{previewText}</p>
        </div>
    );
}