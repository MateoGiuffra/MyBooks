"use client"
import SearchBar from "@/components/search/search-bar";
import React, { PropsWithChildren } from "react";

export const TITLE = "Título"
export const DATE = "Fecha"
interface ISearchLayoutProps extends PropsWithChildren {
    searchState: { actualSearch: string, setActualSearch: (word: string) => void; }
}

const SearchLayout: React.FC<ISearchLayoutProps> = ({ children, searchState }) => {
    return (
        <div className="w-full flex flex-col h-full items-center gap-8">
            <SearchBar
                searchState={searchState}
                orderBy={() => { }}
                filters={[TITLE, DATE]}
            />
            {children}
        </div>
    );
};

export default SearchLayout;