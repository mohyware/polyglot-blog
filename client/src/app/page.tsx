import Card from "./components/viewCard"
import { fetchPosts } from "./lib/data"
import { Post } from "./lib/definitions"
export default async function Home() {
  const data = await fetchPosts()
  return (
    <div className="flex flex-col justify-center ">
      {data.Posts.map((post: Post) => (
        <Card key={post._id} id={post._id}></Card>
      ))}
    </div>
  );
}
