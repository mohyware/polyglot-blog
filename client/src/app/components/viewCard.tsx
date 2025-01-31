import { fetchPost } from "@/app/lib/data";
import { ViewPost } from "./buttons";
import SummarizeButton from "./SummarizeButton";
export default async function Card({ id }: { id: string }) {
    const post = await fetchPost(id)
    const title = post.title;
    const previewText = post.body.split('. ').slice(0, 2).join('. ') + '...';
    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <h1 className="text-2xl py-4 font-bold text-slate-900">{title}</h1>
                <div className="flex justify-end gap-4">
                    <ViewPost id={post._id}></ViewPost>
                    <SummarizeButton id={post._id} title={title}></SummarizeButton>
                </div>
            </div>
            <p className="text-slate-700 text-lg py-2">{previewText}</p>
        </div>
    );
}