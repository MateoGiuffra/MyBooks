"use client"
import React from 'react'
import Search from '@/components/search/search'
import { booksService } from '@/services/books'
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated'

const SearchHome = () => {
    const { id, isLoading, userState } = useUserAuthenticated()

    return (
        isLoading || !userState ?
            <div>cargando...</div>
            :
            <Search callback={() => booksService.getMyBooksByUserId(id)} />
    )
}

export default SearchHome