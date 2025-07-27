import React from 'react'

const BookSkeleton = () => {
    return (
        <div
            className="h-[56px] w-full rounded-[8px] bg-gray-200 relative overflow-hidden"
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(90deg, rgba(220,220,220,0) 0%, rgba(220,220,220,0.6) 50%, rgba(220,220,220,0) 100%)',
                    animation: 'shimmer 1.5s infinite linear'
                }}
            />
        </div>
    )
}


export default BookSkeleton