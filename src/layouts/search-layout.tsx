"use client"
import SearchBar from "@/components/search/search-bar";
import { SimpleBook } from "@/types/book";
import React, { PropsWithChildren } from "react";

interface ISearchLayoutProps extends PropsWithChildren {
    search?: (word: string) => void;
}

const SearchLayout: React.FC<ISearchLayoutProps> = ({ children, search }) => {
    return (
        <div className="w-full flex flex-col h-full items-center gap-8">
            <SearchBar search={search} />
            {children}
        </div>
    );
};

export default SearchLayout;