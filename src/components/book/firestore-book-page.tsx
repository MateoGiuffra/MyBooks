"use client"
import { useOnlyFetching } from "@/hooks/useOnlyFectching";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import BookPageLayout from "@/layouts/book-page-layout";
import { booksService } from "@/services/books";
import { BookFirestore } from "@/types/book";
import React from "react";
import BookPageSkeleton from "../skeletons/book-page-skeleton";
import { notFound } from "next/navigation";

interface IFirestoreBookPageProps {
    id: string;
}

const FirestoreBookPage: React.FC<IFirestoreBookPageProps> = ({ id }) => {
    const { id: userId, isLoading: isUserLoading, userState } = useUserAuthenticated();
    const { isLoading, value: book } = useOnlyFetching<BookFirestore | null>(async () => await booksService.getFirestoreBookByUserId(id, userId), [], [userState, userId]);

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