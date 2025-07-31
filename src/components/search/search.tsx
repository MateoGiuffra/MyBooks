"use client"
import { BookFirestore, SimpleBook } from '@/types/book';
import React from 'react'
import BookCard from '../book/book';
import FadeInFlex from '@/layouts/fade-in-flex';
import BookSkeleton from '../skeletons/book-skeleton';
import { useFetching } from '@/hooks/useFetching';
import { useRouter } from 'next/navigation';
import SearchBar from './search-bar';
import NoResultsCard from './search-no-results';

interface ISearchProps {
    callback: (...args: unknown[]) => Promise<(SimpleBook | BookFirestore)[]>;
    dependencies?: unknown[];
    searchState: { actualSearch: string, setActualSearch: (word: string) => void; }
    orderBy: (word: string, books: SimpleBook[] | BookFirestore[]) => SimpleBook[] | BookFirestore[];
    filters: string[];
}

const Search = ({ callback, dependencies = [], searchState, orderBy, filters }: ISearchProps) => {
    const { actualSearch } = searchState;
    const { isLoading, values: books, updateValues } = useFetching<SimpleBook | BookFirestore>(callback, [actualSearch], [actualSearch, ...dependencies], 200);
    const router = useRouter();

    return (
        <div className="w-full flex flex-col h-full items-center gap-8">
            <SearchBar searchState={searchState} orderBy={(s: string) => {
                const booksSorted = orderBy(s, books)
                updateValues(booksSorted)
            }} filters={filters} />
            {
                isLoading ?
                    <div className='flex flex-col gap-2 items-center justify-center w-full'>
                        {Array.from({ length: 9 }).map((_, i) =>
                            <BookSkeleton key={i} />)}
                    </div>
                    : (
                        books.length === 0 ?
                            <NoResultsCard />
                            :
                            <FadeInFlex>
                                {books?.map((b) =>
                                    <div key={b.id} onClick={() => router.push(b.id)}>
                                        <BookCard value={b} />
                                    </div>
                                )}
                            </FadeInFlex>)
            }
        </div>
    );
};

export default Search;
