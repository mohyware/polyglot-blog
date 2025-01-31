import Card from "../components/postCard"
import { fetchPosts } from "../lib/data"
import { Post } from '@/app/lib/definitions';
import { CreatePost } from "../components/buttons";
export default async function Home() {
    const data = await fetchPosts()
    return (
        <div className="flex flex-col justify-center ">
            <CreatePost></CreatePost>
            {data.Posts.map((post: Post) => (
                <Card key={post._id} id={post._id}></Card>
            ))}
        </div>
    );
}
