"use client"
import { useOnlyFetching } from "@/hooks/useOnlyFectching";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { booksService } from "@/services/books";
import { Book, BookFirestore } from "@/types/book";
import React, { useState } from "react";
import ReviewEditSection from "./book-review-edit";
import BookReviewInfo from "./review-info";
import ReviewSkeleton from "../skeletons/review-skeleton";
import BookReviewLayout from "@/layouts/review-layout";

interface IBookReviewProps {
    book: Book | BookFirestore;
}


const BookReview: React.FC<IBookReviewProps> = ({ book }) => {

    const { id } = useUserAuthenticated();
    const { isLoading, value: firestoreBook } = useOnlyFetching<BookFirestore | null>(() => booksService.getFirestoreBookById(id, book.id), [], [id], 0)
    const [editeReviewMode, setEditReviewMode] = useState<boolean>(false);

    const finishEditMode = () => {
        setEditReviewMode(false)
    }

    const startEditMode = () => {
        setEditReviewMode(true);
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 100)

    }

    if (isLoading || !firestoreBook) {
        return (
            <BookReviewLayout>
                <ReviewSkeleton />
            </BookReviewLayout>
        )
    }

    return (
        <BookReviewLayout >
            {
                firestoreBook.review.hasReview && !editeReviewMode ?
                    <BookReviewInfo book={firestoreBook} startEditMode={startEditMode} />
                    :
                    < ReviewEditSection book={book} finishEditMode={finishEditMode} />
            }
        </BookReviewLayout >
    );
};

export default BookReview;