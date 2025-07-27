"use client"
import React, { useState } from 'react'
import AddBookIcon from '../icons/add-book-icon'
import SearchHome from '../search/search-home'
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated'
import Search from '../search/search'
import { booksService } from '@/services/books'
import Spinner from '../loading/spinner'
import SearchSkeleton from '../skeletons/search-skeleton'

const Home = () => {
    const [reloadSearch, setReloadSearch] = useState(false);
    const { id, isLoading, userState } = useUserAuthenticated()
    return (
        <>
            <div className="relative w-full flex items-center justify-center  h-header" >
                <h1 className="text-[18px] font-bold h-full flex items-center justify-center">My Books</h1>
                <AddBookIcon reloadSearch={() => setReloadSearch(true)} />
            </div>
            <div className='flex flex-col items-center w-full h-full p-4 m-[-15px]'>
                {isLoading || !userState ?
                    <SearchSkeleton />
                    :
                    <Search dependencies={[reloadSearch]} callback={() => booksService.getMyBooksByUserId(id)} />}
            </div>
        </>
    )
}

export default Home