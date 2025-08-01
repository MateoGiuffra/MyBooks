"use client"
import { useOnlyFetching } from "@/hooks/useOnlyFectching";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import BookPageLayout from "@/layouts/book-page-layout";
import { booksService } from "@/services/books";
import { BookFirestore } from "@/types/book";
import React, { useEffect, useState } from "react";
import BookPageSkeleton from "../skeletons/book-page-skeleton";
import { notFound } from "next/navigation";

interface IFirestoreBookPageProps {
    id: string;
}

const FirestoreBookPage: React.FC<IFirestoreBookPageProps> = ({ id }) => {
    const { id: userId, isLoading: isUserLoading, userState } = useUserAuthenticated();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [book, setBook] = useState<BookFirestore | null | undefined>(null);

    const fetch = async () => {
        try {
            setIsLoading(true);
            console.log(id)
            const book = await booksService.getFirestoreBookByUserId(id, userId)
            console.log("book", book)
            setBook(book);
        } catch (_) {
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId && userState) {
            fetch();
        }
    }, [userState, userId])


    if (isUserLoading || isLoading) {
        return <BookPageSkeleton />
    }

    if (!book) { notFound() }

    return (
        <div>
            <BookPageLayout book={book} />
        </div>
    );
};

export default FirestoreBookPage;