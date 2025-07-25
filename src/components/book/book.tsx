import React from "react";
import { SimpleBook } from "@/types/book";

interface IBookCardProps {
    value: SimpleBook
}

const BookCard: React.FC<IBookCardProps> = ({ value }) => {
    return (
        <article className="flex w-full rounded-[8px] items-center gap-3 justify-start active:bg-gray-300 hover:bg-gray-300">
            <div className="w-[56px] h-[56px] rounded-[8px]">
                <img
                    className="w-full h-full object-cover rounded-[8px]"
                    src={value.imageLinks.smallThumbnail}
                    alt={value.title}
                />
            </div>
            <section className="flex flex-col text-ellipsis">
                <h2 className="font-bold w-full max-w-[30vh] truncate overflow-hidden whitespace-nowrap ">{value.title}</h2>
                <p className="text-[14px] w-full max-w-[30vh] truncate overflow-hidden whitespace-nowrap">Authors: {value.authors}</p>
            </section>
        </article>
    );
};

export default BookCard;