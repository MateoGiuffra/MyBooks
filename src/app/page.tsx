import React from 'react'
import SearchHome from '@/components/search/search-home';
import AddBookIcon from '@/components/icons/add-book-icon';

const page = () => {

    return (
        <div className='w-full h-screen items-center flex-col justify-center'>
            <main className='flex flex-col items-center w-full h-full'>
                <div className="relative w-full flex items-center justify-center  h-header" >
                    <h1 className="text-[18px] font-bold h-full flex items-center justify-center">My Books</h1>
                    <AddBookIcon />
                </div>
                <div className='flex flex-col items-center w-full h-full p-4 m-[-15px]'>
                    <SearchHome />
                </div>
            </main>
        </div>
    )
}

export default page