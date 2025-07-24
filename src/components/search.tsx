import { Book } from '@/types/book';
import React from 'react'
import BookCard from './book';
import FadeInFlex from './fade-in-flex';
import SearchLayout from '@/layouts/search-layout';

interface ISearchProps {
    call: () => Promise<Book[] | undefined>;
}

const Search: React.FC<ISearchProps> = async ({ call }) => {
    const books = await call();

    return (
        <SearchLayout>
            <FadeInFlex>
                {books?.map((b) => <BookCard key={b.id} value={b} />)}
            </FadeInFlex>
        </SearchLayout>
    );
};

export default Search;
