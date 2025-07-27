"use client"
import { BookFirestore, SimpleBook } from '@/types/book';
import React, { useState } from 'react'
import BookCard from '../book/book';
import FadeInFlex from '@/layouts/fade-in-flex';
import SearchLayout from '@/layouts/search-layout';
import BookSkeleton from '../skeletons/book-skeleton';
import { useFetching } from '@/hooks/useFetching';
import { useRouter } from 'next/navigation';
import SearchSkeleton from '../skeletons/search-skeleton';

interface ISearchProps {
    callback: (...args: any[]) => Promise<(SimpleBook | BookFirestore)[]>;
    dependencies?: any[];
}

const Search = ({ callback, dependencies = [] }: ISearchProps) => {
    const [actualSearch, setActualSearch] = useState<string>("fantasy");
    const { isLoading, values: books } = useFetching<SimpleBook | BookFirestore>(callback, [actualSearch], [actualSearch, ...dependencies], 300);
    const router = useRouter();

    if (isLoading) {
        return (
            <SearchSkeleton />
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
