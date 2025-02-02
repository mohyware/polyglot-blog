import Card from "../../components/viewCard"
import SearchBar from "../../components/search"
import Pagination from "../../components/pagination"
import { fetchPosts } from "../../lib/data"
import { Post } from "../../lib/definitions"
import NoResult from "../../components/noResult"
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
