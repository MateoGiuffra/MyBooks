"use client"
import React, { ChangeEvent, FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { SimpleBook } from "@/types/book";
interface ISearchBarProps {
    search?: (word: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ search }) => {

    const [value, setValue] = useState("");

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value: newValue } = e.target;
        if (newValue.length > value.length && value.length !== 0) {
            search && search(value)
        }

        setValue(newValue);
    }

    const orderBy = (order: string) => {

    }

    return (
        <div className="w-full flex flex-col gap-4">
            <form onSubmit={(e) => e.preventDefault()} className="w-full relative rounded-[4px] ">
                <input
                    type="text"
                    className="bg-[#d4dff0] w-full p-2 pl-12 rounded-[4px]"
                    placeholder="Buscar"
                    onChange={(e) => onHandleChange(e)}
                />
                <MagnifyingGlassIcon width={24} className="absolute left-2 top-[20%] " />
                <button type="submit"></button>
            </form>
            <div className="flex items-center gap-2">
                {["Fecha", "Títuto", "Autor"].map((order) =>
                    <div
                        key={order}
                        onClick={() => orderBy(order)}
                        className="font-medium w-auto flex items-center p-2 pt-1 pb-1 bg-[#d4dff0] rounded-[4px]"
                    >
                        {order}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;