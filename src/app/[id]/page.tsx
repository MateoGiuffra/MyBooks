import React from 'react'
import { booksService } from '@/services/books';
import FirestoreBookPage from '@/components/book/firestore-book-page';
import BookPageLayout from '@/layouts/book-page-layout';
import { NotFoundException } from '@/services/exceptions';

interface IBookPageProps {
    params: Promise<{ id: string }>
}

const BookPage: React.FC<IBookPageProps> = async ({ params }) => {
    const { id } = await params;

    let book;
    try {
        book = await booksService.getBookById(id);
    } catch (error) {
        if (error instanceof NotFoundException) {
            return <FirestoreBookPage id={id} />
        }
    }

    if (!book) return null;

    return (
        <BookPageLayout book={book} />
    );
};

export default BookPage;
