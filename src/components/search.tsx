"use client"
import { SimpleBook } from '@/types/book';
import React, { useEffect, useState } from 'react'
import BookCard from './book';
import FadeInFlex from './fade-in-flex';
import SearchLayout from '@/layouts/search-layout';
import { booksService } from '@/services/books';
import debounce from 'just-debounce-it';
import BookSkeleton from './skeletons/book-skeleton';
interface ISearchProps { }

const Search: React.FC<ISearchProps> = () => {
    const [books, setBooks] = useState<SimpleBook[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [actualSearch, setActualSearch] = useState<string>("fantasy");
    console.log(actualSearch);
    const fetch = async () => {
        try {
            setIsLoading(true);
            const simpleBooks = await booksService.searchBooks(actualSearch);
            setBooks(simpleBooks);
            setIsLoading(false);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchDebounce = debounce(() => fetch(), 300, true);
        fetchDebounce();
    }, [actualSearch]);

    if (isLoading) {
        return (
            <>
                <SearchLayout>
                    <div className='flex flex-col gap-2 items-center justify-center w-full'>
                        {Array.from({ length: 9 }).map((_, i) =>
                            <BookSkeleton key={i} />)}
                    </div>
                </SearchLayout>
            </>
        )
    }

    return (
        <SearchLayout search={setActualSearch}>
            <FadeInFlex>
                {books?.map((b) => <BookCard key={b.id} value={b} />)}
            </FadeInFlex>
        </SearchLayout>
    );
};

export default Search;
