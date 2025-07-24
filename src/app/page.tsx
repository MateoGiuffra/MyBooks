import Search from '@/components/search'
import React, { Suspense } from 'react'
import { booksServices } from '@/services/books'
import SearchLayout from '@/layouts/search-layout'
import BookSkeleton from '@/components/skeletons/book-skeleton';
import FadeInFlex from '@/components/fade-in-flex'

const page = () => {

    return (
        <div className='w-full h-screen items-center flex-col justify-center p-4'>
            <main className='flex flex-col items-center w-full h-full gap-8'>
                <div className="relative w-full flex items-center justify-center">
                    <h1 className="text-[18px] font-bold h-full">My Books</h1>
                    <p className="absolute right-0 text-4xl h-full flex items-center">+</p>
                </div>
                <Suspense
                    fallback={
                        <SearchLayout>
                            <div className='flex flex-col gap-2 items-center justify-center w-full'>
                                {Array.from({ length: 12 }).map((_, i) =>
                                    <BookSkeleton key={i} />)}
                            </div>
                        </SearchLayout>
                    }>
                    <Search call={booksServices.searchBooks} />
                </Suspense>
            </main>
        </div>
    )
}

export default page