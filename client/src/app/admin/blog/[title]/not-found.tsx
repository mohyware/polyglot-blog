"use client";
import { Home, PreviousPage } from '../../../components/buttons';
export default function notFound() {
    return (
        <div className='flex items-center justify-center w-full min-h-[70vh] text-gray-900 my-12 px-4'>
            <div className='flex flex-col items-center w-full gap-8'>
                <h1 className='text-9xl md:text-16xl w-full select-none text-center font-black text-gray-400'>
                    404
                </h1>
                <p className='text-3xl font-semibold text-center'>Blog Post Not Found</p>
                <p className='text-2xl md:px-12 text-center'>
                    {"  The blog post you're looking for might have been deleted, moved, or never existed."}
                </p>
                <div className='flex flex-row justify-between gap-8'>
                    <PreviousPage />
                    <Home />
                </div>
            </div>
        </div>
    );
}