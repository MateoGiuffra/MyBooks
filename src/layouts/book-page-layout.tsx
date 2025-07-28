import BookDescription from "@/components/book/book-description";
import BookReview from "@/components/book/book-review";
import { Book, BookFirestore } from "@/types/book";
import React from "react";

interface IBookPageLayoutProps {
    book: BookFirestore | Book
}

const BookPageLayout: React.FC<IBookPageLayoutProps> = ({ book }) => {
    const { volumeInfo: {
        title,
        authors,
        description,
        imageLinks,
    } } = book;
    return (
        <div className="overflow-scroll w-screen flex flex-col justify-between">
            <img
                className="w-full h-[218px] object-cover"
                src={imageLinks.smallThumbnail}
                alt={title}
            />
            <div className='w-full p-4 flex flex-col items-center h-full gap-4'>
                <div className='w-full flex flex-col items-center h-full'>
                    <h2 className='text-[22px] font-bold w-full'>{title}</h2>
                    <p className='w-full text-theme-lighter'>by {authors}</p>
                </div>
                <BookDescription html={description ?? " "} />
                <div className='w-full'>
                    <BookReview book={book} />
                </div>
            </div>
        </div>
    );
};

export default BookPageLayout;