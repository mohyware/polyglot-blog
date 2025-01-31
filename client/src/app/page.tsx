import Card from "./components/viewCard"
import { fetchPosts } from "./lib/data"
export default async function Home() {
  const data = await fetchPosts()
  return (
    <div className="flex flex-col justify-center ">
      {data.Posts.map((post) => (
        <Card key={post._id} id={post._id}></Card>
      ))}
    </div>
  );
}
