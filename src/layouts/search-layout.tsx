"use client"
import SearchBar from "@/components/search/search-bar";
import { SimpleBook } from "@/types/book";
import React, { PropsWithChildren } from "react";

interface ISearchLayoutProps extends PropsWithChildren {
    searchState: { actualSearch: string, setActualSearch: (word: string) => void; }
}

const SearchLayout: React.FC<ISearchLayoutProps> = ({ children, searchState }) => {
    return (
        <div className="w-full flex flex-col h-full items-center gap-8">
            <SearchBar searchState={searchState} />
            {children}
        </div>
    );
};

export default SearchLayout;