import { Book, BookFirestore } from "@/types/book";
import React from "react";
import BookButton from "../ui/book-button";

interface BookIReviewInfoProps {
    book: Book | BookFirestore;
    startEditMode: () => void;
}

const BookReviewInfo: React.FC<BookIReviewInfoProps> = ({ book, startEditMode }) => {
    if (!book) {
        return <>HOLA</>
    }

    const { review } = book;

    let dateFormatted = "";
    let yearFormatted = "";

    if (review.publishedRead && typeof (review.publishedRead as any).toDate === "function") {
        const dateObj = (review.publishedRead as any).toDate();
        dateFormatted = dateObj.toLocaleDateString("es-ES", {
            month: "long",
            day: "numeric"
        });
        yearFormatted = dateObj.toLocaleDateString("es-ES", {
            year: "numeric"
        });
    }
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex gap-4 items-center" >
                <h3 className="font-bold text-[36px] h-full ">{review.score}</h3>
                <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    defaultValue={review.score}
                    className="star-rating black mt-[-6px]"
                    style={{ ['--val' as any]: review.score } as React.CSSProperties}
                />
            </div>
            <p>{book.review.content}</p>
            <div className="flex flex-col ">
                <div className="border-t-1 border-gray-400 pt-4 max-w-[110px]"></div>
                <p className="text-theme-lighter">Ultima vez leido</p>
                <p>{dateFormatted},</p>
                <p>{yearFormatted}</p>
            </div>
            <BookButton bgColor="blue" fontColor="white" onHandleClick={startEditMode}>
                Editar Review
            </BookButton>
        </div>
    );
};

export default BookReviewInfo;