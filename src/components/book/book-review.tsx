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

    const finishEditMode = () => {
        setEditReviewMode(false);
        fetch();
    }

    const startEditMode = () => {
        setEditReviewMode(true);
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }, 100)
    }


    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id, editeReviewMode]);

    if (isLoading || userIsLoading) {
        return (
            <BookReviewLayout>
                <ReviewSkeleton />
            </BookReviewLayout>
        );
    }

    return (
        <BookReviewLayout>
            {editeReviewMode || !firestoreBook?.review?.hasReview
                ? <ReviewEditSection book={firestoreBook ?? book} finishEditMode={finishEditMode} />
                : <BookReviewInfo book={firestoreBook} startEditMode={startEditMode} />}
        </BookReviewLayout>
    );
};

export default BookReview;