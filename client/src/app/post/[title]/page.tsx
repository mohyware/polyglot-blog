import { fetchPost } from "@/app/lib/data";
import { Back } from "@/app/components/buttons";
import SummarizeButton from "@/app/components/SummarizeButton";

export default async function Post(props: { params: Promise<{ title: string }> }) {
    const params = await props.params;
    const id = params.title
    const post = await fetchPost(id)
    return (
        <div className="w-full">
            <div className="flex flex-row justify-between items-center py-4">
                <Back></Back>
                <SummarizeButton id={post._id} title={post.title}></SummarizeButton>
            </div>
            <h1 className="text-3xl py-4">{post.title}</h1>
            <p className="text-slate-700 text-lg py-2 ">{post.body}</p>
        </div>
    );
}