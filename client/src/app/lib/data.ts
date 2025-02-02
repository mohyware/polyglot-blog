
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

export async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:4000/api/posts/');
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