import React from 'react'

const BookSkeleton = () => {
    return (
        <div
            className='h-[56px] w-full rounded-[8px] bg-gray-300'
            style={{
                animation: "fadeInUp 0.9s ease-in-out infinite",
                animationDelay: `100ms`
            }}
        >
        </div>
    )
}

export default BookSkeleton