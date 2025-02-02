export default function Loading() {
    return (
        <div className="w-full animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
    );
}
