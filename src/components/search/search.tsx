"use client"
import { SimpleBook } from '@/types/book';
import React, { useState } from 'react'
import BookCard from '../book/book';
import FadeInFlex from '@/layouts/fade-in-flex';
import SearchLayout from '@/layouts/search-layout';
import BookSkeleton from '../skeletons/book-skeleton';
import { useFetching } from '@/hooks/useFetching';
import { useRouter } from 'next/navigation';

interface ISearchProps {
    callback: (...args: any[]) => Promise<SimpleBook[]>
}

const Search = <T,>({ callback }: ISearchProps) => {
    const [actualSearch, setActualSearch] = useState<string>("fantasy");
    const { isLoading, values: books } = useFetching<SimpleBook>(callback, [actualSearch], [actualSearch], 300);
    const router = useRouter();

    if (isLoading) {
        return (
            <SearchLayout>
                <div className='flex flex-col gap-2 items-center justify-center w-full'>
                    {Array.from({ length: 9 }).map((_, i) =>
                        <BookSkeleton key={i} />)}
                </div>
            </SearchLayout>
        )
    }

    return (
        <SearchLayout search={setActualSearch}>
            <FadeInFlex>
                {books?.map((b) =>
                    <div onClick={() => router.push(b.id)}>
                        <BookCard key={b.id} value={b} />
                    </div>
                )}
            </FadeInFlex>
        </SearchLayout>
    );
};

export default Search;
