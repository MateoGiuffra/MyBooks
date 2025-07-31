import React from 'react'

const BookPageSkeleton = () => {
    return (
        <div className="overflow-scroll w-screen flex flex-col justify-between">
            <div className="relative w-full h-[218px] bg-gray-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>

            <div className="w-full p-4 flex flex-col items-center h-full gap-12">
                <div className="w-full flex flex-col h-full gap-2">
                    <div className="relative w-3/4 h-6 bg-gray-300 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                    <div className="relative w-1/2 h-4 bg-gray-200 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    {[90, 85, 70, 60, 90, 85, 70, 60].map((width, i) => (
                        <div
                            key={i}
                            className={`relative h-4 bg-gray-200 rounded-md overflow-hidden w-[${width}%]`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                    ))}
                </div>
                <div className="w-full p-4 flex flex-col items-center">
                    <div className="relative w-1/2 h-4 bg-gray-200 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent animate-shimmer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookPageSkeleton