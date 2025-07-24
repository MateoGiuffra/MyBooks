import SearchBar from "@/components/search-bar";
import React, { PropsWithChildren } from "react";

interface ISearchLayoutProps extends PropsWithChildren {

}

const SearchLayout: React.FC<ISearchLayoutProps> = ({ children }) => {
    return (
        <div className="w-full flex flex-col h-full items-center gap-8">
            <SearchBar />
            {children}
        </div>
    );
};

export default SearchLayout;