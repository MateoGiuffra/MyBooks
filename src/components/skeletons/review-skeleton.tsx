const ReviewSkeleton = () => {
    return (
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <div className="h-[36px] w-[36px] bg-gray-300 rounded animate-pulse" />
                <div className="star-rating bg-gray-300 mt-[-6px] rounded animate-pulse" style={{ width: "10rem", height: "2rem" }} />
            </div>

            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-11/12 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-10/12 animate-pulse" />
            </div>

            <div className="flex flex-col">
                <div className="border-t border-gray-300 pt-4 max-w-[110px] animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-[140px] mt-2 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-[80px] mt-1 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded w-[60px] mt-1 animate-pulse" />
            </div>

            <div className="h-10 w-[130px] bg-gray-300 rounded-lg animate-pulse" />
        </div>
    );
};

export default ReviewSkeleton;
