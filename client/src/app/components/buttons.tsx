"use client";
import Link from 'next/link';
import { deletePost } from '../lib/actions'
import { useRouter } from "next/navigation";

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);
  return (
    <form action={deletePostWithId}>
      <button type="submit"
        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
      >
        Delete
      </button>
    </form>
  );
}

export function ViewPost({ id }: { id: string }) {
  return (
    <Link href="/blog/[id]" as={`/blog/${id}`}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      View
    </Link>
  );
}

export function AdminViewPost({ id }: { id: string }) {
  return (
    <Link href="/admin/blog/[id]" as={`/admin/blog/${id}`}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      View
    </Link>
  );
}

export function Back() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Back
    </button>
  );
}

export function PreviousPage() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className='flex justiy-center items-center px-5 py-2 text-xl rounded-md text-black border border-indigo-500 hover:bg-indigo-500 hover:text-white'
    >
      Previous Page
    </button>
  );
}

export function Home() {
  return (
    <Link href="/" as={`/`}
      className='flex justiy-center items-center px-5 py-2 text-xl rounded-md text-black border border-green-500 hover:bg-green-500 hover:text-white'>
      Home Page
    </Link>
  );
}


export function EditPost({ id }: { id: string }) {
  return (
    <Link href="/admin/blog/[title]/edit" as={`/admin/blog/${id}/edit`}
      className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
    >
      Edit
    </Link>
  );
}

export function CreatePost() {
  return (
    <Link href="/admin/blog/create" as={`/admin/blog/create`}
      className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
    >
      + Create New Blog
    </Link>
  );
}