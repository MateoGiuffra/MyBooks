"use client"
import React, { useState } from 'react'
import Search from '@/components/search/search'
import { booksService } from '@/services/books'
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated'
import { SimpleBook, BookFirestore } from '@/types/book'
export const TITLE = "Título"
export const DATE = "Fecha"
import { orderByTitle, orderByDate } from '@/utils/search'

const SearchAddBook = () => {
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
        <Search
            filters={filters}
            orderBy={orderBy}
            searchState={searchState}
            callback={() => booksService.searchBooks(actualSearch)}
        />
    )
}

export default SearchAddBook