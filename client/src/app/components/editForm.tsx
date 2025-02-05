'use client';
import { Post } from "../lib/definitions";
import { updatePost, State } from '@/app/lib/actions';
import { useActionState, useState, useEffect } from 'react';
import { Back } from "./buttons";
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function Form({ post }: { post: Post }) {
    const initialState: State = { message: '', success: false, errors: {} };
    const updatePostWithId = updatePost.bind(null, post._id);
    const [state, formAction] = useActionState(updatePostWithId, initialState);

    const [formData, setFormData] = useState({
        title: post.title,
        body: post.body,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (state.errors) {
            // Show error toast for any form errors
            if (state.errors.title) {
                toast.error(`Title error: ${state.errors.title.join(', ')}`);
            }
            if (state.errors.body) {
                toast.error(`Body error: ${state.errors.body.join(', ')}`);
            }
        }
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                redirect('/admin/blog/' + post._id);
            }
            else {
                toast.error(`${state.message}`);
            }
        }
    }, [state.errors, state.message, state.success, post._id]);


    return (
        <form action={formAction}>
            {/* title */}
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
            <textarea
                id="title"
                name="title"
                rows={2}
                onChange={handleChange}
                value={formData.title}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your blog title..."
            ></textarea>
            {/* legacy error */}
            {/* <div id="title-error" aria-live="polite" aria-atomic="true">
                {state.errors?.title &&
                    state.errors.title.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div> */}
            {/* body */}
            <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 ">Blog</label>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200  border-gray-200">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse ">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                        </div>
                    </div>
                    <br />
                    <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip ">
                        Show full screen
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-b-lg ">
                    <label htmlFor="body" className="sr-only">Publish post</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={33}
                        onChange={handleChange}
                        value={formData.body}
                        className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0 focus:outline-none focus:border-transparent"
                        placeholder="Write your blog content here..."
                    ></textarea>
                </div>
            </div>
            {/* legacy error */}
            {/* <div id="body-error" aria-live="polite" aria-atomic="true">
                {state.errors?.body &&
                    state.errors.body.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div> */}
            {/* <div id="message-error" aria-live="polite" aria-atomic="true">
                {state.message && (
                    <p className="mt-2 text-sm text-red-500">
                        {state.message}
                    </p>)}
            </div> */}
            <div className="flex gap-4">
                <button type="submit"
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                >
                    Update post
                </button>
                <Back></Back>
            </div>
        </form>

    )
}
