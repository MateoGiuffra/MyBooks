import Search from '@/components/search'
import React, { Suspense } from 'react'
import SearchLayout from '@/layouts/search-layout'
import BookSkeleton from '@/components/skeletons/book-skeleton';
import FadeInFlex from '@/components/fade-in-flex'
import Header from '@/components/header';

const page = () => {

    return (
        <div className='w-full h-screen items-center flex-col justify-center'>
            <main className='flex flex-col items-center w-full h-full'>
                <div className="relative w-full flex items-center justify-center  h-header" >
                    <h1 className="text-[18px] font-bold h-full flex items-center justify-center">My Books</h1>
                    <p className="absolute right-0 text-4xl h-full flex items-center pr-4">+</p>
                </div>
                <div className='flex flex-col items-center w-full h-full p-4 m-[-15px]'>
                    <Search />
                </div>
            </main>
        </div>
    )
}

export default page