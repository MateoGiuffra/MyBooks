"use client"
import React from 'react'
import Search from '@/components/search/search'
import { booksService } from '@/services/books'

const SearchHome = () => {
    return (
        <Search callback={booksService.searchBooks} />
    )
}

export default SearchHome