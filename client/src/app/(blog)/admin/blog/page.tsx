import Card from "../../../components/postCard"
import { fetchPosts } from "../../../lib/data"
import { Post } from '@/app/lib/definitions';
import { CreatePost } from "../../../components/buttons";
import SearchBar from "../../../components/search"
import Pagination from "../../../components/pagination"
import NoResult from "../../../components/noResult"
export default async function Blog(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const data = await fetchPosts({ query, page: currentPage });
    return (
        <div>
            <CreatePost />
            <br />
            {data.Posts.length === 0 ? (
                <div>
                    <SearchBar placeholder="Search Posts..." />
                    <NoResult />
                </div>
            ) : (
                <div>
                    <SearchBar placeholder="Search Posts..." />
                    {data.Posts.map((post: Post) => (
                        <Card key={post._id} post={post} />
                    ))}
                    <br />
                    <Pagination totalPages={data.totalPages} />
                </div>
            )}
        </div>
    );
}
