"use client"
import React, { useState } from 'react'
import AddBookIcon from '../icons/add-book-icon'
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated'
import Search from '../search/search'
import { booksService } from '@/services/books'
import SearchSkeleton from '../skeletons/search-skeleton'
import { BookFirestore, SimpleBook } from '@/types/book'
import { orderByDateReview, orderByTitle } from '@/utils/search'
import Header from '../ui/header'
export const TITLE = "Título"
export const DATE = "Fecha"
const Home = () => {
    const [actualSearch, setActualSearch] = useState<string>("");
    const searchState = { actualSearch, setActualSearch }
    const [reloadSearch, setReloadSearch] = useState(false);
    const { id, isLoading, userState } = useUserAuthenticated();

    const filters = [TITLE, DATE];

    const orderBy = (filter: string, books: SimpleBook[] | BookFirestore[]) => {
        switch (filter) {
            case TITLE:
                return orderByTitle(books);
            case DATE:
                return orderByDateReview(books);
            default:
                return books;
        }
    }

    return (
        <div className='w-full flex flex-col items-center gap-2'>
            <Header
                title='MyBooks'
                ArrowBack={<AddBookIcon reloadSearch={() => setReloadSearch(true)} />}
                dir="right"
            />
            <div className='flex flex-col items-center w-full h-full p-4 m-[-15px]'>
                {isLoading || !userState ?
                    <SearchSkeleton searchState={searchState} />
                    :
                    <Search
                        filters={filters}
                        orderBy={orderBy}
                        searchState={searchState}
                        callback={() => booksService.searchBooksOfUserIdByWord(id, actualSearch)}
                        dependencies={[reloadSearch]}
                    />
                }
            </div>
        </div>
    )
}

export default Home

