
export async function fetchPost(id: string) {
    try {
        const response = await fetch('http://localhost:4000/api/posts/' + id);
        const data = await response.json()
        return data.post;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch post data.');
    }
}

export async function fetchPosts(searchParams: { query?: string; page?: number; }) {

    const { query, page } = searchParams;
    const queryString = query ? `query=${query}&page=${page}` : `page=${page}`
    try {
        const url = `http://localhost:4000/api/posts${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(`${url}`);
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch posts data.');
    }
}

export async function SummarizePost(id: string) {
    try {
        const response = await fetch('http://localhost:4000/api/posts/summary/' + id);
        const data = await response.json()
        return data.summary;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch summarized post data.');
    }
}