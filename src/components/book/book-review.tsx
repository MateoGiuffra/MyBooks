"use client"
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { booksService } from "@/services/books";
import { Book, BookFirestore } from "@/types/book";
import React, { useEffect, useState } from "react";
import ReviewEditSection from "./book-review-edit";
import BookReviewInfo from "./review-info";
import ReviewSkeleton from "../skeletons/review-skeleton";
import BookReviewLayout from "@/layouts/review-layout";

interface IBookReviewProps {
    book: Book | BookFirestore;
}


const BookReview: React.FC<IBookReviewProps> = ({ book }) => {

    const [firestoreBook, setFirestoreBook] = useState<BookFirestore | null>(book);
    const { id, isLoading: userIsLoading } = useUserAuthenticated();
    const [editeReviewMode, setEditReviewMode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const vals = await booksService.getFirestoreBookByUserId(book.id, id);
            setFirestoreBook(vals);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    }, [id, editeReviewMode])

    const finishEditMode = () => {
        setEditReviewMode(false)
    }

    const startEditMode = () => {
        setEditReviewMode(true);
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 100)
    }

    if (isLoading || userIsLoading) {
        return (
            <BookReviewLayout>
                <ReviewSkeleton />
            </BookReviewLayout>
        )
    }

    return (
        <BookReviewLayout >
            {
                firestoreBook && firestoreBook.review.hasReview && !editeReviewMode ?
                    <BookReviewInfo book={firestoreBook} startEditMode={startEditMode} />
                    :
                    <ReviewEditSection book={firestoreBook ?? book} finishEditMode={finishEditMode} />
            }
        </BookReviewLayout >
    );
};

export default BookReview;