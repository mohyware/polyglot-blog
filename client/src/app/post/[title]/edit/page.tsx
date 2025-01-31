import Form from '@/app/components/editForm';
import { fetchPost } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Post } from '@/app/lib/definitions';
export default async function Page(props: { params: Promise<{ title: string }> }) {
    const params = await props.params;
    const id = params.title;
    const post: Post = await fetchPost(id)
    if (!post) {
        notFound();
    }
    return (
        <main>
            <Form post={post} />
        </main>
    );
}