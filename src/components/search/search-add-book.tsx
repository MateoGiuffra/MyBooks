"use client"
import React from 'react'
import Search from '@/components/search/search'
import { booksService } from '@/services/books'
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated'

const SearchAddBook = () => {

    return (
        <Search callback={booksService.searchBooks} />
    )
}

export default SearchAddBook