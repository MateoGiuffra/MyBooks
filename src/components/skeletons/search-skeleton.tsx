import SearchLayout from '@/layouts/search-layout'
import React from 'react'
import BookSkeleton from './book-skeleton'

const SearchSkeleton = () => {
    return (
        <SearchLayout>
            <div className='flex flex-col gap-2 items-center justify-center w-full'>
                {Array.from({ length: 9 }).map((_, i) =>
                    <BookSkeleton key={i} />)}
            </div>
        </SearchLayout>
    )
}

export default SearchSkeleton