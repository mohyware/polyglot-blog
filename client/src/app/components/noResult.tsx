"use client";
export default function NoResult() {
    return (
        <div className='flex items-center justify-center w-full min-h-[70vh] text-gray-900 my-12 px-4'>
            <div className='flex flex-col items-center w-full gap-8'>
                <p className='text-3xl font-semibold text-center'>No Blog Found</p>
                <p className='text-2xl md:px-12 text-center'>
                    {"  The blog post you're looking for might have been deleted, moved, or never existed."}
                </p>
            </div>
        </div>
    );
}