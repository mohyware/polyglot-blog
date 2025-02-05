'use server'
const baseUrl = process.env.API_URL;
export async function fetchPost(id: string) {
    try {
        const response = await fetch(`${baseUrl}/posts/${id}`);
        const data = await response.json()
        if (!response.ok)
            throw new Error(`something went wrong getting posts try to refresh the page`);

        return data.post;
    } catch (error) {
        throw error;
    }
}

export async function fetchPosts(searchParams: { query?: string; page?: number; }) {

    const { query, page } = searchParams;
    const queryString = query ? `query=${query}&page=${page}` : `page=${page}`
    try {
        const url = `${baseUrl}/posts${queryString ? `?${queryString}` : ""}`;
        const response = await fetch(`${url}`);
        if (!response.ok) {
            throw new Error(`something went wrong getting posts try to refresh the page`);
        }

        const data = await response.json()
        return data;
    } catch (error) {
        console.error(error);
        return {
            error: "There was a problem fetching data."
        };
    }
}

export async function SummarizePost(id: string, selectedModel: string) {
    try {
        const response = await fetch(`${baseUrl}/posts/summary/${id}?service=${selectedModel}`);
        if (!response.ok) {
            throw new Error("This Model is not Working Right Now Try Again or change The Model.");
        }

        const data = await response.json()
        return data.summary;
    } catch (error) {
        console.log(error);
        return {
            error: "This Model is not Working Right Now Try Again or change The Model."
        };
    }
}