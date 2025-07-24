import React from 'react'
import { booksService } from '@/services/books';
interface IBookPageProps {
    params: Promise<{ id: string }>
}

const BookPage: React.FC<IBookPageProps> = async ({ params }) => {
    const { id } = await params;
    const book = await booksService.getBookById(id);
    return (
        <div>
            <img src={book?.volumeInfo.imageLinks.extraLarge} alt="" />
        </div>
    );
};

export default BookPage;
