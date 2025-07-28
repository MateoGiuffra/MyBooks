"use client"
import React, { useState } from 'react'
import Search from '@/components/search/search'
import { booksService } from '@/services/books'
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated'
import { DATE, TITLE } from '@/types/general'
import { orderByDate, orderByTitle } from '@/utils/search'
import { BookFirestore, SimpleBook } from '@/types/book'

const SearchHome = () => {
    const { id, isLoading, userState } = useUserAuthenticated()
    const [actualSearch, setActualSearch] = useState("")
    const searchState = { actualSearch, setActualSearch }

    const filters = [TITLE, DATE];

    const orderBy = (filter: string, books: SimpleBook[] | BookFirestore[]) => {
        switch (filter) {
            case TITLE:
                return orderByTitle(books);
            case DATE:
                return orderByDate(books);
            default:
                return books;
        }
    }

    return (
        isLoading || !userState ?
            <div>cargando...</div>
            :
            <Search filters={filters} orderBy={orderBy} searchState={searchState} callback={() => booksService.searchBooksOfUserIdByWord(id)} />
    )
}

export default SearchHome