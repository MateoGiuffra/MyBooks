"use client"
import React, { ChangeEvent, FormEvent, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { capitalizeFirstLetter } from "@/utils/general";
interface ISearchBarProps {
    searchState: { actualSearch: string, setActualSearch: (word: string) => void; }
    orderBy: (word: string) => void;
    filters: string[]
}

const SearchBar: React.FC<ISearchBarProps> = ({ searchState, orderBy = () => { }, filters = [] }) => {

    const { actualSearch, setActualSearch } = searchState;
    const inputRef = useRef<HTMLInputElement>(null);

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value: newValue } = e.target;
        if (newValue.length < actualSearch.length) {
            setActualSearch(actualSearch.slice(0, -1));
        } else {
            setActualSearch(newValue);
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputValue = formData.get("search")
        const newValue = inputValue?.toString() ?? ""
        setActualSearch(newValue);
    }

    return (
        <div className="w-full flex flex-col gap-4 ">
            <form onSubmit={(e) => onSubmit(e)} className="w-full relative rounded-[4px] ">
                <input
                    ref={inputRef}
                    type="text"
                    value={actualSearch}
                    name="search"
                    className="w-full p-2 pl-12 rounded-[4px] bg-search text-search"
                    placeholder="Buscar"
                    onChange={onHandleChange}
                />
                <MagnifyingGlassIcon width={24} className="absolute left-2 top-[20%] " />
                <button type="submit"></button>
            </form>
            <div className="flex items-center gap-2">
                {filters.map((order) =>
                    <div
                        key={order}
                        onClick={() => orderBy(order)}
                        className="font-medium w-auto flex items-center p-2 pt-1 pb-1 bg-search text-search rounded-[4px]"
                    >
                        {capitalizeFirstLetter(order)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;