"use client"
import React, { FormEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
interface ISearchBarProps {
    search?: () => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ search = () => { } }) => {

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e);
    }
    const orderBy = (order: string) => {

    }

    return (
        <div className="w-full flex flex-col gap-4">
            <form onSubmit={(e) => onHandleSubmit(e)} className="w-full relative rounded-[4px] ">
                <input
                    type="text"
                    className="bg-[#d4dff0] w-full p-2 pl-12 rounded-[4px]"
                    placeholder="Buscar"
                />
                <MagnifyingGlassIcon width={24} className="absolute left-2 top-[20%] " />
                <button></button>
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